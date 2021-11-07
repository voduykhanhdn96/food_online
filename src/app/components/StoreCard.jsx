import { Link } from "react-router-dom"
import { Card, Header, Icon, Image } from "semantic-ui-react"

const StoreCard = ({ store }) => {
  const { image, name, shopId, phoneNumber } = store
  const link = `/store/${shopId}`

  const imageSrc = image
    ? `data:image/jpeg;base64,${image}`
    : `https://dummyimage.com/500x500/ecf0f1/aaa`

  return (
    <Card color="red" raised>
      <Image rounded src={imageSrc} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <Link to={link}>
            <Header as="h6" color="red">
              {name}
            </Header>
          </Link>
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Icon name="phone"></Icon> {phoneNumber}
      </Card.Content>
    </Card>
  )
}

export default StoreCard
