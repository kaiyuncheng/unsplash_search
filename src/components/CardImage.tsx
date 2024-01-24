import Card from 'react-bootstrap/Card';

export default function CardImage({ item, getSingleImage }) {
    return (
        <Card>
            <a href="#"
                onClick={(e) => {
                    e.preventDefault();
                    getSingleImage(item.id);
                    
                }}>
                <Card.Img className="img-cover" width="100%" height="300" src={`${item.urls.raw}&w=600&q=80`} />
            </a>
        </Card>
    );
}
