import { Button, Icon } from "semantic-ui-react"

const ActionCellRenderer = props => {
  const { onViewOrder, data } = props
  const { orderId } = data

  return (
    <Button
      icon
      labelPosition="left"
      color="blue"
      size="tiny"
      onClick={() => onViewOrder(orderId)}
      title="View Order"
    >
      <Icon name="eye" />
      View Order
    </Button>
  )
}

export default ActionCellRenderer
