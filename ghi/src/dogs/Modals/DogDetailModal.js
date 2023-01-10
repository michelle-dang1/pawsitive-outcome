import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'

function DogDetailModal({activeModal, setActiveModal, dogId, runUseEffect}) {
    const [dog, setDog] = useState(undefined)

    useEffect(() => {
        if (dogId != null){
            fetch(`http://localhost:8000/api/dogs/{dog_id}?id=${dogId}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setDog(data)
                console.log(`This is data: ${JSON.stringify(data)}`)
            })
        }
    }, [runUseEffect])


    function handleClose() {
        setDog(null)
        setActiveModal(false)
    }


    return(
        <>
        {dog &&
            <Modal show={activeModal} onHide={handleClose}>
                <Modal.Body>
                    <div className="card" style={{width: '18rem'}}>
                        <img src={dog.picture_url} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{dog.name}</h5>
                                <p className="card-subtitle mb-2 text-muted">
                                    Gender: {dog.gender}
                                </p>
                                <p className="card-subtitle mb-2 text-muted">
                                    Breed: {dog.breed}
                                </p>
                                <p className="card-subtitle mb-2 text-muted">
                                    Age: {dog.age}
                                </p>
                                <p className="card-subtitle mb-2 text-muted">
                                    Size: {dog.size}
                                </p>
                                <p className="card-subtitle mb-2 text-muted">
                                    Notes: {dog.notes}
                                </p>
                                <button className='btn btn-primary'>Adoption</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        }
        </>
    )
}
export default DogDetailModal