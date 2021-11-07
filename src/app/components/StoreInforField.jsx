import { Icon, Label } from "semantic-ui-react"
const StoreInforField = ({ title, label, link, icon }) => {
  return (
    <div className="info-field">
      <h5>{title}</h5>
      {link && (
        <Label color="red" size={"large"} as="a" href={link}>
          <Icon name={icon} />
          {label}
        </Label>
      )}
      {!link && (
        <Label color="red" size={"large"}>
          <Icon name={icon} />
          {label}
        </Label>
      )}
    </div>
  )
}

export default StoreInforField
