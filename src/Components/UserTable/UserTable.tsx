import React, { useEffect, useState } from 'react'

const API_HOST = 'http://localhost:4000'
const INVENTORY_API_URL = `${API_HOST}/inventory`
interface Props {
  content?: string;
}

interface Items{
  'id': number
  'name': string,
  'email': string,
  'phoneNumber': string,
}

const UserTable: React.FC<Props> = ({}): React.ReactElement => {
  const [data, setData] = useState([])

  const fetchInventory = (): void => {
    fetch(`${INVENTORY_API_URL}`)
      .then(res => {
        // eslint-disable-next-line no-console
        console.log('res', res)
        return res.json()})
      .then(json => {
        // eslint-disable-next-line no-console
        console.log('json', json)
        return setData(json)})
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
  })

  const [unitPrice, setUnitPrice] = useState(null || '')

  /**
     *
     * @param id - The id of the product
     * @param currentUnitPrice - The current unit price of the product
     */
  const onEdit = ({ id, currentUnitPrice }): void => {
    setInEditMode({
      status: true,
      rowKey: id
    })
    setUnitPrice(currentUnitPrice)
  }

  /**
     *
     * @param id
     * @param newUnitPrice
     */
  const updateInventory = ({ id, newUnitPrice }): void => {
    // eslint-disable-next-line no-console
    console.log('unit price', newUnitPrice)
    // eslint-disable-next-line no-console
    console.log('id', id)
    fetch(`${INVENTORY_API_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        phoneNumber:newUnitPrice
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(json => {
        // reset inEditMode and unit price state values
        onCancel()
        // fetch the updated data
        fetchInventory()
      })
  }

  const deleteUser = (id): void => {
    // eslint-disable-next-line no-console
    console.log('id', id)
    fetch(`${INVENTORY_API_URL}/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('sucessfull delete')
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
      })

    //
  }

  /**
     *
     * @param id -The id of the product
     * @param newUnitPrice - The new unit price of the product
     */
  const onSave = ({ id, newUnitPrice }): void => {
    updateInventory({ id, newUnitPrice })
  }

  const onCancel = (): void => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null
    })
    // reset the unit price state value
    setUnitPrice('')
  }

  return (
    <div className='container'>
      <h1>Simple Inventory Table</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item: Items) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  {
                    inEditMode.status && inEditMode.rowKey === item.id ? (
                      <input value={unitPrice}
                        onChange={(event): void => setUnitPrice(event.target.value)}
                      />
                    ) : (
                      item.phoneNumber
                    )
                  }
                </td>
                <td>
                  {
                    inEditMode.status && inEditMode.rowKey === item.id ? (
                      <React.Fragment>
                        <button
                          className={'btn-success'}
                          onClick={(): void => onSave({ id: item.id, newUnitPrice: unitPrice })}
                        >
                        Save
                        </button>
                        <button
                          className={'btn-secondary'}
                          style={{ marginLeft: 8 }}
                          onClick={(): void => onCancel()}
                        >
                        Cancel
                        </button>
                      </React.Fragment>
                    ) : (
                      <div>
                        <button
                          className={'btn-primary'}
                          onClick={(): void => onEdit({ id: item.id,
                            currentUnitPrice: item.phoneNumber })}
                        >
                      Edit
                        </button>

                        <button
                          className={'btn-primary'}
                          onClick={(): void => deleteUser(item.id)}
                        >
                      Delete
                        </button>

                      </div>

                    )
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserTable