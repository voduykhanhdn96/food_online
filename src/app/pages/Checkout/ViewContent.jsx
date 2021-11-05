import { Table } from "semantic-ui-react"
import { formatCurrency } from "../../helpers/number-helper"
import ViewCart from "./ViewCart"

const ViewContent = props => {
  return (
    <>
      <Table color="violet" key="violet">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell>Products</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.groups &&
            props.groups.map(group =>
              group.items.map(item => (
                <ViewCart key={item.itemId} item={item} />
              ))
            )}
          <Table.Row>
            <Table.Cell />
            <Table.Cell />
            <Table.Cell />
            <Table.Cell />
            <Table.Cell style={{ color: "brown" }}>
              <strong>{formatCurrency(props.totalPrice)}</strong>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      {/* <table className="table table-hover">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th className="text-center">Price</th>
            <th className="text-center">Total</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {props.groups &&
            props.groups.map(group =>
              group.items.map(item => (
                <ViewCart key={item.itemId} item={item} />
              ))
            )}
        </tbody>
        <tfoot>
          <tr>
            <td>   </td>
            <td>   </td>
            <td>   </td>
            <td>
              <h3>Total</h3>
            </td>
            <td className="text-right">
              <h3>
                <strong>{formatCurrency(props.totalPrice)}</strong>
              </h3>
            </td>
          </tr>
        </tfoot>
      </table> */}
    </>
  )
}
export default ViewContent
