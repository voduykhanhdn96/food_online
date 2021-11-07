import { Label } from "semantic-ui-react"
const OrderInformation = ({ title, label, link }) => {
  return (
    <div className="info-field">
      <h5>{title}</h5>
      <Label size={"large"}>{label}</Label>
    </div>
  )
}

export default OrderInformation
