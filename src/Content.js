import './Content.css';
import {useState, useEffect} from 'react'
import axios from 'axios';
import Modal from './Modal';
import Card from './Card';


const Content = () => {
    const [allDishes, setAllDishes] = useState([]);
    const [selectedDishes, setSelectedDishes] = useState(new Array(3).fill(0));
    const ranks = [30,20,10];
    const [currentSelection, setCurrentSelection] = useState('');
    const [resultArray, setResultArray] = useState([]);
    const URL = 'https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json'
    
    useEffect(() => {
        const performApi = async () => {
            try {
                const dishes = await axios.get(URL);
                setAllDishes(dishes.data.map(dish => {
                   return { ...dish, points:0, isSelected:false};
                }));
            } catch (error) {
                alert(error.massage);
            }
        }
        
        performApi();
        
    }, [])


    const selectHandle = (rank, dish) => {
        
        
        if(selectedDishes[rank] && selectedDishes[rank].id !== dish.id){
            let ele =document.getElementById(selectedDishes[rank].id);
            ele.className = 'dish-card';
            ele = ele.querySelector('button')
            // ele.disabled = false;
            ele.className = 'card-btn'            
        }

        let ele =document.getElementById(dish.id);
        ele.className = 'dish-card-selected dish-card'
        ele = ele.querySelector('button');
        // ele.disabled = true;
        ele.className = 'card-btn-selected'  

        
        setSelectedDishes(prev => {
            const tempPoint = dish.points+ranks[rank];
            
            prev[rank] = {...dish, points:tempPoint};
            // prev[rank] = dish;
            return [...prev];           
        })
        setCurrentSelection('');
    }

    
    const cardClickHandle = (dish) => {
        const check = selectedDishes.find(dishT => dishT.id === dish.id)
        
        if(check){
            setSelectedDishes(prev => {
                const tempArr = prev.map(dishT => {
                    if(dish.id === dishT.id){return 0};
                    return dishT;
                })
                return tempArr;
            })
            let ele =document.getElementById(dish.id);
            ele.className = 'dish-card';
            ele = ele.querySelector('button')
            // ele.disabled = false;
            ele.className = 'card-btn'  

            return;
        }

        setCurrentSelection(dish);
    }

    
    
    const voteHandle = (vote) =>{
        if(vote){
            let tempArr = [...allDishes];
            for(let dish of selectedDishes){
               if(!dish){
                alert('Please Select 3 Dishes before Voting')
                return;
               } 
               allDishes.forEach(dishT => {
                if(dishT.id === dish.id){
                    tempArr[dish.id-1] = {...dish, isSelected:true};
                    return;
                }
                ;
               })
            }
            tempArr.sort((a,b) =>  b.points - a.points )
            document.getElementById('results').className = 'poll-result-tab';
            setResultArray(tempArr);
            return;
        }

    }


  
    

    return (
    <>  <div className="container">
            {/* <Header/>    */}
            <div className='vote' >
                <div onClick={e => voteHandle('vote')} className="vote-buttons" >Vote</div>
                {/* <div onClick={e => voteHandle('')} className="vote-buttons" >Reset</div> */}
            </div>
        <div className="content-container">
            
            {currentSelection && <Modal 
                                    setCurrentSelection={setCurrentSelection} 
                                    dishes={selectedDishes}
                                    currentSelection={currentSelection}
                                    selectHandle={selectHandle}
                                    />}
    
            <div id='results' className="poll-result-tab-toggle">
                <h2 style={{color:'#ffe4e2', marginBottom:'10px'}}>Popular Dishes(Results)</h2>

                
                {resultArray.map(dish => {
                    return (
                        <div 
                            className={dish.isSelected ? 'result-dish-card result-dish-card-selected':'result-dish-card'} 
                            key={dish.id}>
                            
                            <img className='card-selected' src="./images/pizza.jpg" alt=""  />
                            <div>    
                                <h3 className='card-item'>{dish.dishName}</h3>
                                <p className='card-item'>{dish.description}</p>
                            </div>
                        </div>
                        
                    )
                })}

            </div>
            <div className="dish-tab">
            
                {allDishes.map(dish => {
                    return (  <Card key={dish.id} 
                              dish={dish} 
                              cardClickHandle={cardClickHandle}
                              />)
                }
                )}

            </div>

        </div>
        </div>
    </>
    )
}

export default Content;