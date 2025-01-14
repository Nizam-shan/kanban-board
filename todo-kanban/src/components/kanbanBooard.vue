<script>
import draggable from 'vuedraggable';
import TaskCard from './TaskCard.vue';
import AddTaskModel from './AddTaskModel.vue';
import { onMounted, ref } from 'vue';
import { createTask, deleteTaskById, getTask ,updateTaskStatus} from '@/services/api';
import Navbar from './Navbar.vue';


export default {
    components:{
        draggable,
        AddTaskModel,
        TaskCard,
        Navbar
    },
    setup(){
        const sections = ref([
            { title: "todo", tasks: [] },
      { title: "pending", tasks: [] },
      { title: "done", tasks: [] },
        ])


        const showAddTaskModal = ref(false)
        const currentSection = ref("")


        onMounted(async()=>{
            const res = await getTask()
           


res.data.data.forEach((task)=>{
   
     let section = sections.value.find((s)=>s.title === task.status)
     if(!section){
      section = {title:task.status,tasks:[]}
      sections.value.push(section)
     }
     section.tasks.push(task)

})
        })


        const addSection = ()=>{
        
            const reviewSection = sections.value.filter((s)=>s.title.startsWith("Review"))
            const newSection = reviewSection.length  + 1
            const newSectionTitle = `Review_${newSection}`
            sections.value.push({ title: newSectionTitle, tasks: [] })


        }
        const openAddTaskModal = (section)=>{
            currentSection.value = section
            showAddTaskModal.value = true;
        }

          const closeAddTaskModal = ()=>{
    console.log("came");
    
             showAddTaskModal.value = false;
        }

        const addTask = async(task)=>{
            if (!task.title) {
                console.error("Task title is required");
                return;
            }
            const res = await createTask(task)
            const section = sections.value.find((s)=>s.title === task.status)
            if(section) section.tasks.push(res.data.data)
        }


          const deleteTask = async(taskId)=>{
           
            console.log(taskId);
            
          try {
             await deleteTaskById(taskId)


          
             const section = sections.value.find((s) =>
      s.tasks.some((task) => task._id === taskId)
    );
            console.log("🚀 ~ deleteTask ~ section:", section)
            if(section) {
                    section.tasks = section.tasks.filter((task) => task._id !== taskId);
                    console.log("ss",section);
                    
            }
          } catch (error) {
            console.log("error",error);
            
          }
        }

const onDragEnd =async (event)=>{
    const {item,to} = event
    const taskId = item.getAttribute("data-task-id");
    console.log("🚀 ~ onDragEnd ~ taskId:", taskId)
    console.log(item);
    if (!taskId) {
        console.error("Task ID is missing");
        return;
    }
    
          const newSectionTitle = to.closest(".kanban-section").querySelector("h3").textContent;
          console.log("🚀 ~ onDragEnd ~ newSectionTitle:", newSectionTitle)
    let newStatus = newSectionTitle.toLowerCase().replace(/ /g,"_");
    console.log("🚀 ~ onDragEnd ~ newStatus:", newStatus)
    // if (newSectionTitle === "Todo") newStatus = "pending";
    // if (newSectionTitle === "In Progress") newStatus = "in_progress";
    // if (newSectionTitle === "Done") newStatus = "completed";
    

    try {
       console.log(newStatus);
       
        const res = await updateTaskStatus(taskId, newStatus);
        console.log("Updated task:", res.data);
    } catch (error) {
        console.error("Failed to update task status:", error);
    }
  
    console.log("Task moved to new section:", newSectionTitle);
}   
 return {
      sections,
      showAddTaskModal,
      currentSection,
      addSection,
      openAddTaskModal,
      closeAddTaskModal,
      addTask,
      deleteTask,
      onDragEnd,
    };
    }
}


</script>
<template>
  <div>
    <Navbar />


    <div class="kanban-board grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 h-screen overflow-auto bg-white">
  
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="kanban-section flex flex-col bg-white rounded-lg  p-4"
      >
      
        <div class="section-header flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-700">{{ section.title.toUpperCase() }}</h3>
          <button
            class="text-gray-600 text-xl bg-white p-1 rounded-full hover:bg-gray-200"
            @click="openAddTaskModal(section.title)"
          >
            +
          </button>
        </div>

      
        <draggable
          v-model="section.tasks"
          :group="{ name: 'tasks' }"
          @end="onDragEnd"
          class="task-list flex flex-col gap-4 flex-1 overflow-y-auto bg-gray-100 rounded-xl p-3"
          itemKey="_id"
        >
          <template #item="{ element }">
            <div :data-task-id="element._id">
              <TaskCard :task="element" :key="element._id" @deleteTask="deleteTask" />
            </div>
          </template>
        </draggable>
      </div>

  
      <div class="flex  justify-end p-4">
        <button
          class="text-gray-400 text-xl  px-6 py-3 rounded-lg h-12 flex "
          @click="addSection"
        >
          + Add Section
        </button>
      </div>
    </div>

    <AddTaskModel
      v-if="showAddTaskModal"
      :section="currentSection"
      @addTask="addTask"
      @close="closeAddTaskModal"
    />
  </div>
</template>
