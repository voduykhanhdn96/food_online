import { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import BillName from "./BillName";
import BillPersonDetail from "./BillPersonDetail";
import { Table } from "semantic-ui-react";

const BillPerson = ({ orderPerson }) => {
  const [activePerson, setActivePerson] = useState(orderPerson[0].userId);

  const handlePersonClick = (name) => {
    setActivePerson(name);
  };

  const orderDetail = orderPerson.filter((order) =>
    order.userId.includes(activePerson)
  );

  return (
    <div>
      <Menu attached="top" tabular>
        {orderPerson.map((person) => (
          <BillName
            handlePersonClick={handlePersonClick}
            activePerson={activePerson}
            key={person.userId}
            id={person.userId}
            userName={person.userName}
          />
        ))}
      </Menu>

      <Segment raised attached="bottom">
        <Table color="brown" key="brown" inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Food</Table.HeaderCell>
              <Table.HeaderCell>Food Name</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {orderDetail.length !== 0 &&
            orderDetail[0].items.map((item) => (
              <BillPersonDetail key={item.itemId} item={item} />
            ))}
        </Table>
      </Segment>
    </div>
  );
};
export default BillPerson;
