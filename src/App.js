// import React from 'react';
import { useEffect, useState } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';

const url = 'https://course-api.com/react-tabs-project';

function App() {
  
  // hooks
  const [isLoading, setIsLoading] = useState( true );
  const [jobs, setJobs] = useState( [] );
  const [value, setValue] = useState( 0 );

  // fetch
  const fetchJobs = async () => {
    
    const response = await fetch( url );

    const newJobs = await response.json();

    setJobs( newJobs );
    setIsLoading( false );
    
  }

  // hook 
  useEffect(() => {
    fetchJobs();
    // console.log('solo una vez')
  }, [])

  if( isLoading ){
    return(
      <section className="section loading">
        <h1>Cargando...</h1>
      </section>
    )
  }

  // desestructuramos la data que viene en el estado `jobs` despues del loading
  const { title, dates, duties, company } = jobs[ value ];

  return(
     <section className='section'>
      <div className='title'>
        <h2>experiencia</h2>
        <div className='underline'></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {
            jobs.map( (item, i) => {

              const { id, company } = item;

              return(
                <button
                  key={ id }
                  onClick={ () => setValue( i ) }
                  // si es igual hace la acción si no, no hace nada 
                  className={`job-btn ${ i === value && 'active-btn' }`}
                >
                  { company }
                </button>
              );
            } )
          }
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{ title }</h3>
          <h4>{ company }</h4>
          <p className="job-date">{ dates }</p>
          {
            duties.map( (duty, index) => {
              return(
                <div key={ index } className="job-desc">
                  <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight>
                  <p>{ duty }</p>
                </div>
              )
            })
          }
        </article>
      </div>
      <button type="button" className="btn">
        más información
      </button>
     </section>
  )
}

export default App;
