<template>
  <div>
    <Navbar />
    <div class="kanban-board grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-4 h-screen overflow-auto bg-white font-sans">
      
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="kanban-section flex flex-col bg-white rounded-lg p-1"
      >
        <div class="section-header flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-700">  {{ section.title.charAt(0).toUpperCase() + section.title.slice(1).toLowerCase() }}</h3>
          <div class="flex items-center gap-2 text-center">
         
            <button
              class="text-gray-400 text-xl bg-white p-1 rounded-full hover:bg-gray-200"
              @click="addSection(index)"
            >
              +
            </button>
            
            <button
              class="text-xl bg-white p-1 rounded-full text-gray-400 flex text-center items-center " 
              @click="openDeleteSectionModal(index)"
            >
              ...
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto bg-gray-100 rounded-xl p-3">
         <draggable
  v-model="section.tasks"
  :group="{ name: 'tasks' }"
  @end="onDragEnd"
  class="task-list flex flex-col gap-4 rounded-lg p-4"
  itemKey="_id"
>
  <template #item="{ element }">
    <div :data-task-id="element._id">
      <TaskCard :task="element" :key="element._id" @deleteTask="deleteTask" />
    </div>
  </template>


  <template #footer v-if="!section.tasks.length">
  
  </template>
</draggable>


       
          <div class="flex justify-center mt-4">
            <button
              class="text-gray-500 px-6 py-2 rounded-md text-xl"
              @click="openAddTaskModal(section)"
            >
              +  Add Task
            </button>
          </div>
        </div>
      </div>
      

      <div class="flex justify-start p-4 text-center">
        <button
          class="text-gray-400 text-xl font-semibold px-6 py-3 rounded-lg h-12 flex gap-3"
          @click="addSection(sections.length - 1)"  
        >
          <span class="text-2xl">+</span> Add Section
        </button>
      </div>
    </div>

    <AddTaskModel
      v-if="showAddTaskModal"
      :section="currentSection"
      @addTask="addTask"
      @close="closeAddTaskModal"
    />

    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <input v-model="newSectionName" placeholder="Enter new section name" class="modal-input" />
        <div class="modal-actions">
          <button @click="submitSectionNameChange">Submit</button>
          <button @click="deleteSectionAction">Delete Section</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import TaskCard from './TaskCard.vue';
import AddTaskModel from './AddTaskModel.vue';
import { onMounted, ref } from 'vue';
import { createTask, deleteTaskById, getTask, updateTaskStatus } from '@/services/api';
import Navbar from './Navbar.vue';

export default {
    components: {
        draggable,
        AddTaskModel,
        TaskCard,
        Navbar
    },
    setup() {
        const sections = ref([
            { title: "todo", tasks: [] },
            { title: "pending", tasks: [] },
            { title: "done", tasks: [] },
        ]);

        const showAddTaskModal = ref(false);
        const currentSection = ref("");
        const sectionToAddAfter = ref(null);
        const showDeleteModal = ref(false);
        const sectionToDelete = ref(null);
        const newSectionName = ref("");

        onMounted(async () => {
            const res = await getTask();

            res.data.data.forEach((task) => {
                let section = sections.value.find((s) => s.title === task.status);
                if (!section) {
                    section = { title: task.status, tasks: [] };
                    sections.value.push(section);
                }
                section.tasks.push(task);
            });
        });

        const addSection = (index) => {
            const newSection = { title: `Review_${sections.value.length + 1}`, tasks: [] };
            sections.value.splice(index + 1, 0, newSection); 
        };

        const deleteSection = (index) => {
            sections.value.splice(index, 1); 
        };

        const openAddTaskModal = (section) => {
            currentSection.value = section;
            showAddTaskModal.value = true;
        };

        const closeAddTaskModal = () => {
            showAddTaskModal.value = false;
        };

        const addTask = async (task) => {
            if (!task.title) {
                console.error("Task title is required");
                return;
            }
            const res = await createTask(task);
            const section = sections.value.find((s) => s.title === task.status);
            if (section) section.tasks.push(res.data.data);
        };

        const deleteTask = async (taskId) => {
            try {
                await deleteTaskById(taskId);
                const section = sections.value.find((s) =>
                    s.tasks.some((task) => task._id === taskId)
                );
                if (section) {
                    section.tasks = section.tasks.filter((task) => task._id !== taskId);
                }
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        };

        const onDragEnd = async (event) => {
            const { item, to } = event;
            const taskId = item.getAttribute("data-task-id");
            if (!taskId) return;

            const newSectionTitle = to.closest(".kanban-section").querySelector("h3").textContent;
            let newStatus = newSectionTitle.toLowerCase().replace(/ /g, "_");

            try {
                const res = await updateTaskStatus(taskId, newStatus);
                console.log("Updated task:", res.data);
            } catch (error) {
                console.error("Failed to update task status:", error);
            }
        };

    
        const openDeleteSectionModal = (index) => {
            showDeleteModal.value = true;
            sectionToDelete.value = index;
        };

        const submitSectionNameChange = () => {
            const section = sections.value[sectionToDelete.value];
            if (newSectionName.value) {
                section.title = newSectionName.value;
            }
            showDeleteModal.value = false;
        };

      const deleteSectionAction = async () => {
    try {

        const section = sections.value[sectionToDelete.value];

        if (section && section.tasks.length > 0) {
       
            for (const task of section.tasks) {
                await deleteTask(task._id);
            }
        }

       
        sections.value.splice(sectionToDelete.value, 1);

        showDeleteModal.value = false;
    } catch (error) {
        console.error("Error deleting section and tasks:", error);
    }
};

        return {
            sections,
            showAddTaskModal,
            currentSection,
            addSection,
            deleteSection,
            openAddTaskModal,
            closeAddTaskModal,
            addTask,
            deleteTask,
            onDragEnd,
            openDeleteSectionModal,
            showDeleteModal,
            sectionToDelete,
            newSectionName,
            submitSectionNameChange,
            deleteSectionAction,
        };
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
    width: 100%;
}

.modal-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: black;
}

.modal-actions button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    margin-right: 10px;
}

.modal-actions button:last-child {
    background-color: #f44336;
}
</style>
