import "./ProcessStatus.css";

import { formatCurrency } from "../../helpers/number-helper";
import { Image } from "semantic-ui-react";

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

          {step === -1 ? (
            <Image
              src={`https://media.istockphoto.com/illustrations/canceled-stamp-red-grunge-seal-illustration-id929735046?k=20&m=929735046&s=612x612&w=0&h=9uKGiTr4qfD92TooZimWT4V5bnoF9P1814_qCGBFG8Y=`}
            />
          ) : (
            <div className="order-status">
              <div className="order-status-timeline">
                <div
                  className={`order-status-timeline-completion c` + step}
                ></div>
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
        </div>
      </div>
    </div>
  );
};
export default ProcessStatus;
