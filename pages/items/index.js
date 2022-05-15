import dbConnect from '../../lib/dbConnect';
import Item from '../../models/Item';
import ItemCard from '../../components/item.card';
import { Row, Image } from 'react-bootstrap';

const Index = ({ items }) => (
  <>
    <Image fuild src="/wave-haikei.svg" />
    <Row xs={2} sm={3} md={4} lg={6} className="g-4">
      {items.map(item => (
        <ItemCard item={item} key={item._id} />
      ))}
    </Row>
  </>
);

export async function getServerSideProps() {
  await dbConnect();

  const result = await Item.find({});
  const items = result.map(doc => {
    const item = doc.toObject();
    item._id = item._id.toString();
    return item;
  });

  return { props: { items: items } };
}

export default Index;
