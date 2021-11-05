import { Button } from "semantic-ui-react"
import StoreInforField from "../../components/StoreInforField"

const LeftSideBar = () => {
  const share = () => {}

  return (
    <div className="admin-layout_side-bar">
      <StoreInforField
        icon="linkify"
        title="Link"
        label="todo"
        link="todo"
      ></StoreInforField>

      <Button
        basic
        content="Share"
        labelPosition="left"
        icon="share alternate"
        onClick={share}
        color="green"
        style={{ marginTop: 15, width: "100%" }}
      />
    </div>
  )
}

export default LeftSideBar
