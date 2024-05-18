"use client";
import React from 'react'
import Script from 'next/script'

function ProjectSelection() {

  async function getAllProjects() {
    let data;
    try {
      let listprojects = document.getElementById("list-projects");



      const response = await fetch('http://localhost:8000/all-projects', {
        method: 'GET',
        // body: uploaddata,

      })

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }

      // Handle response if necessary
      data = await response.json()
      // console.log(data);
      // sessionStorage.setItem("id", data.id)
      // window.location.reload();
      let listprojectsitems = "";

      for (let project of data) {
        // console.log(project.project_id);
        // listprojectsitems += '<p>' + project.project_id + '</p>';

        listprojectsitems += `<label
      htmlFor="${project.project_id}"
      class="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
    >
      <div class="flex items-center">
        &#8203;
        <input value="${project.project_id}" type="checkbox" class="size-4 rounded border-gray-300" id="${project.project_id}" />
      </div>
  
      <div>
        <details>
          <summary>
            <strong class="font-medium text-gray-900"> ${project.project_name} </strong>
          </summary>
  
          <div class='ml-10'>
            <details>
              <summary>
                <strong class="font-medium text-gray-900"> Purpose </strong>
              </summary>
              
  
              <p class="ml-5 mt-1 text-pretty text-sm text-gray-700">
  
  
                ${project.purpose}
              </p>
            </details>
            <details>
              <summary>
                <strong class="font-medium text-gray-900"> Context </strong>
              </summary>
              
              <p class="ml-5 mt-1 text-pretty text-sm text-gray-700">
                ${project.purpose}
              </p>
            </details>
  
          </div>
        </details>
      </div>
    </label>`;
    listprojects.innerHTML = listprojectsitems;
      }
    } catch (error) {
      console.log(error);

    }



  }

  async function interested_project_submission(event) {
    event.preventDefault();
    try {
      const targets = event.currentTarget;
      
      const checked = document.querySelectorAll('input[type="checkbox"]:checked');

      const selected_project_ids = [];
      for (let index = 0; index < checked.length; index++) {
        selected_project_ids.push(checked[index].value);
        
      }
      const formData = new FormData();
      formData.append("project_ids", selected_project_ids);
      formData.append("start_date",targets.start_date.value);
      formData.append("duration",targets.duration.value)
      

      //Sending data to backend endpoint
      const response = await fetch('http://localhost:8000/generate-mou', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',

                },

                body: formData,

            })

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }

    } catch (error) {
      console.log(error)
    }
    
  }


  window.onload = getAllProjects;
  return (
    <>


      <fieldset>
        <legend className="sr-only">Checkboxes</legend>

        <form onSubmit={interested_project_submission} className='mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'>
          <div className="space-y-2">
            <h3 className='text-center'>Our Projects</h3>

            {/* following is the check box list of projects */}
            <div id='list-projects'>

              
            </div>


            

            <div className="p-2 w-full">

              <label
                htmlFor="start-date"
                className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
              >
                Start date
              </label>
              <input name="start_date" id="sta rt-date" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
            </div>
            <div className="p-2 w-full">

              <input type="number" name="duration" id=""  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="Select Duration (in months)" />
            </div>
            <div className="p-2 w-full">
              <button type='submit' className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
            </div>
          </div>
        </form>
      </fieldset>
    </>
  )
}

export default ProjectSelection