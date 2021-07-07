import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

export default function ProductDetail(props) {
  const { image, title, category, price, description } = props.detailData;
  const history = useHistory();
  return (
    <Container maxWidth="md">
      <div className="product-detail">
        <div className="product-detail-img">
          <img src={image} alt="" />
        </div>
        <div className="product-info">
          <button
            onClick={() => {
              history.goBack();
            }}
            className="back-link"
          >
            &lt; Back to previous page
          </button>
          <h1>{title}</h1>
          <p>{category}</p>
          <p>
            <strong>{price}</strong>
          </p>
          <p>{description}</p>
        </div>
      </div>
    </Container>
  );
}
