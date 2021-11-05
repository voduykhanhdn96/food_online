import { Link } from "react-router-dom"
import { Card, Icon, Image } from "semantic-ui-react"

const StoreCard = ({ store }) => {
  const { image, name, shopId, phoneNumber } = store
  const link = `/store/${shopId}`

  return (
    <Card>
      <Image src={`data:image/jpeg;base64,${image}`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <Link to={link}>{name}</Link>
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Icon name="phone"></Icon> {phoneNumber}
      </Card.Content>
    </Card>
  )
}

export default StoreCard
