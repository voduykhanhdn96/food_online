import "./ProgressStatus.css"
import { Container, Image } from "semantic-ui-react"

const ProgressStatus = ({ step }) => {
  return (
    <Container as="div" fluid className="row shop-tracking-status">
      {step > -1 && (
        <div className="order-status">
          <div className="order-status-timeline">
            <div className={`order-status-timeline-completion c${step}`}></div>
          </div>

          <div className="image-order-status image-order-status-new active img-circle">
            <span className="status">Start Order</span>
            <div className="icon"></div>
          </div>

          <div className="image-order-status image-order-status-active active img-circle">
            <span className="status">Confirmed</span>
            <div className="icon"></div>
          </div>

          <div className="image-order-status image-order-status-intransit active img-circle">
            <span className="status">Sent To Kitchen</span>
            <div className="icon"></div>
          </div>

          <div className="image-order-status image-order-status-delivered active img-circle">
            <span className="status">Ready for Pickup</span>
            <div className="icon"></div>
          </div>

          <div className="image-order-status image-order-status-completed active img-circle">
            <span className="status">Delivered</span>
            <div className="icon"></div>
          </div>
        </div>
      )}
      {step === -1 && (
        <Image
          style={{ height: "100px" }}
          centered
          rounded
          src={"/cancelled.png"}
        ></Image>
      )}
    </Container>
  )
}
export default ProgressStatus
