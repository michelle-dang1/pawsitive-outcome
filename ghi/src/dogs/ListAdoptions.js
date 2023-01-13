import { React } from 'react'
import { useGetAdoptionsQuery } from '../store/adoptionsApi'


function ListAdoptions() {
    const {data, error, isLoading} = useGetAdoptionsQuery()

    if (isLoading) {
        return (
            <progress className='progress is-primary' max='100'></progress>
        )
    }

    return (
        <>
            {data.adoptions &&
                <div>
                    {/* <ErrorNotification error={error} /> */}
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {data.adoptions.map(adoption => {
                            return (
                                <div className="col-sm-6" key={adoption.id}>
                                    <div className="card mb-3 shadow">
                                        <img src={adoption.dog.picture_url} className="card-img-top" alt="" />
                                        <div className="card-body">
                                            <h5 className="card-title">{adoption.dog.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Adopted By: {adoption.adopter_name}</h6>
                                            <h6 className="card-subtitle mb-2 text-muted">On: {adoption.date_of_adoption}</h6>
                                            {/*<button className='btn btn-primary' onClick={activateModal(dog.id)} >Read More</button>*/}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </>
    )

}
export default ListAdoptions
