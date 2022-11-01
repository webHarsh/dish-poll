import './Modal.css';

const Modal = ({setCurrentSelection, dishes, currentSelection, selectHandle}) => {

  

    


                          

    return (
        <>
       

    <div onClick={e => setCurrentSelection('')} className="modal-container">
        <div className="modal-box-rank">
        
        {dishes.map((dish, index) => {
            return (
                <div onClick={e => e.stopPropagation()} key={index}>
                    {/* {dish ? selected:notSelected} */}
                    <div className="rank-item">
                                <img className = 'card-item' src={`./images/${dish ? 'pizza':'default'}.jpg`} alt=""  />
                                    <h3>{dish ? dish.dishName : 'Not Selected'}</h3>
                                
                                <div className='rankbtn'>
                                    <h3>Rank {index+1}</h3>
                                    <span onClick={e => selectHandle(index, currentSelection)} className="rank-change-btn">Choose</span>
                                    {/* <span onClick={e => selectHandle(index, 0)} className="rank-change-btn">Remove</span> */}
                                </div>
                        </div>
                    
                </div>
            )
        })}
        </div>
    </div>
        
    
        </>
    )
}

export default Modal;
