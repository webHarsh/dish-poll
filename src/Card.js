
import './Card.css';

const Card = ({dish, cardClickHandle}) =>{ 



    return (
        <div id={dish.id} className="dish-card " >
            
                <img className='card-item' src="./images/pizza.jpg" alt=""  />
                <div className="card-details">
                    <h3 className='card-item'>{dish.dishName}</h3>
                    <p className='card-item'>{dish.description}</p>
                </div>
                
                <button       
                        onClick={e => cardClickHandle(dish)} 
                        className='card-btn'>
                </button>
                
            </div>
        
    )
}

export default Card;