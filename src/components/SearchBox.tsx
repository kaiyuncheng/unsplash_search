import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { SearchHeart } from 'react-bootstrap-icons';


export default function SearchBox({ onSearchEnterHandler, keyword }) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text><SearchHeart className='mx-1' /> Search</InputGroup.Text>
      <Form.Control
        placeholder="Keywords..."
        aria-label="keywords"
        aria-describedby="inputSearch"
        defaultValue={keyword}
        onKeyUp={onSearchEnterHandler}
      />
    </InputGroup>
  );
};