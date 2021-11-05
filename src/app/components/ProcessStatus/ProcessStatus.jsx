import "./ProcessStatus.css"

import { formatCurrency } from "../../helpers/number-helper"

const ProcessStatus = ({ orderInfo, step }) => {
  return (
    <div className="row shop-tracking-status">
      <div className="col-md-12">
        <div className="well">
          <h4>Your order status:</h4>

          <ul className="list-group">
            <li className="list-group-item">
              <span className="prefix">Date created : </span>
              <span className="label label-success">{orderInfo.orderTime}</span>
            </li>
            <li className="list-group-item">
              <span className="prefix">Infomation Order : </span>
              <span className="label label-success">
                {orderInfo.deliveryInformation}
              </span>
            </li>
            <li className="list-group-item">
              <span className="prefix">Total Price : </span>
              <span className="label label-success">
                {formatCurrency(orderInfo.totalPrice)}
              </span>
            </li>
          </ul>

          <div className="order-status">
            <div className="order-status-timeline">
              <div
                className={`order-status-timeline-completion c` + step}
              ></div>
            </div>

            <div className="image-order-status image-order-status-new active img-circle">
              <span className="status">Confirmed</span>
              <div className="icon"></div>
            </div>
            <div className="image-order-status image-order-status-active active img-circle">
              <span className="status">Sent To Kitchen</span>
              <div className="icon"></div>
            </div>
            <div className="image-order-status image-order-status-intransit active img-circle">
              <span className="status">Ready for Pickup</span>
              <div className="icon"></div>
            </div>
            <div className="image-order-status image-order-status-delivered active img-circle">
              <span className="status">Ready for Delivery</span>
              <div className="icon"></div>
            </div>
            <div className="image-order-status image-order-status-completed active img-circle">
              <span className="status">Delivered</span>
              <div className="icon"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProcessStatus
