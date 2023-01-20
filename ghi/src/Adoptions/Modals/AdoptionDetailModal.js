import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useShowAdoptionQuery } from '../../store/pawsitiveApi'
import { useDeleteAdoptionMutation } from '../../store/pawsitiveApi'
import { useUpdateDogMutation } from '../../store/pawsitiveApi'
import ConfirmationModal from '../../alerts/ConfirmationModal'

function AdoptionDetailModal({activeAdoptionDetailModal, setActiveAdoptionDetailModal, adoptionId, dogId}) {
    const skip = adoptionId === null
    const {data: adoption} = useShowAdoptionQuery(adoptionId,{skip})
    const [deleteAdoption] = useDeleteAdoptionMutation()
    const [updateDog, result] = useUpdateDogMutation()
    const [activeConfirmationModal, setActiveConfirmationModal] = useState(false)
    const message = "Are you sure you want to undo the adoption?"

    async function handleDelete() {
        setActiveConfirmationModal(false)
        deleteAdoption(adoptionId)
        handleClose()
        await updateDog(dogId)
    }

    const activateConfirmationModal =  () => {
        setActiveConfirmationModal(true)
    }

    function handleClose() {
        setActiveAdoptionDetailModal(false)
    }

    return(
        <>
            {adoption &&
                <Modal show={activeAdoptionDetailModal} onHide={handleClose}>
                    <Modal.Body>
                        <div className="card" style={{width: '18rem'}}>
                            <img src={adoption.dog.picture_url} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{adoption.dog.name}</h5>
                                    <p className="card-subtitle mb-2 text-muted">
                                        Gender: {adoption.dog.gender}
                                    </p>
                                    <p className="card-subtitle mb-2 text-muted">
                                        Breed: {adoption.dog.breed}
                                    </p>
                                    <p className="card-subtitle mb-2 text-muted">
                                        Age: {adoption.dog.age}
                                    </p>
                                    <p className="card-subtitle mb-2 text-muted">
                                        Size: {adoption.dog.size}
                                    </p>
                                    <p className="card-subtitle mb-2 text-muted">
                                        Notes: {adoption.dog.notes}
                                    </p>
                                <button className='btn btn-primary' onClick={activateConfirmationModal}>Undo</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            }
            <ConfirmationModal activeConfirmationModal={activeConfirmationModal} setActiveConfirmationModal={setActiveConfirmationModal} message={message} func={handleDelete} />
        </>
    )
}
export default AdoptionDetailModal
