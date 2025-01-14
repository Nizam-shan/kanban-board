<template>
  <div class="task-card bg-white p-4 border  shadow w-full rounded-lg">
   
 <div class="flex justify-between text-center items-center">
       <p class="text-gray-800 text-xl">{{ task.descriptions }}</p>
     <div class="relative group">

         <p class="text-black cursor-pointer" @click="onDelete"> ...</p>
         <div
                class="absolute right-full top-1/2 transform
                       -translate-y-1/2 mr-2 w-max px-2 py-1 
                       text-sm text-gray-600 bg-gray-200 rounded 
                       shadow-lg opacity-0 group-hover:opacity-100">
                      Delete Task
            </div>
       </div>
    


    <!--  -->
      <!-- <div class="relative group">
            <button class="px-4 py-2 text-white
                           bg-blue-500 rounded 
                           hover:bg-blue-600">
                Hover me (Top)
            </button>
            <div
                class="absolute bottom-full left-1/2 
                       transform -translate-x-1/2 mb-2 
                       w-max px-2 py-1 text-sm text-white
                       bg-gray-700 rounded shadow-lg 
                       opacity-0 group-hover:opacity-100">
                       Tooltip on Top
            </div>
        </div> -->

 </div>


 <div class="flex gap-2 mt-8 items-center" >
   <div>
     <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span class="font-medium text-gray-600 dark:text-gray-300">JL</span>
</div>
</div>
<p :class="{ 'text-blue-600': formatteddate === 'Tomorrow' ,'text-red-600': formatteddate === 'Yesterday'  , 'text-gray-600': formatteddate !== 'Tomorrow' && formatteddate !== 'Yesterday'}">{{ formatteddate }}</p>
   <div class="flex justify-end text-end ml-auto bg-gray-100 rounded-lg px-2 ">
    <p class="text-gray-400">{{ task.title }}</p>
   </div>
 </div>


    <!-- <button
      @click="onDelete"
      class="mt-2 text-sm text-red-500 hover:text-red-700"
    >
      Delete
    </button> -->
  </div>
</template>

<script>
export default {
  props: ["task"],
  emits: ["deleteTask"],
  computed:{
formatteddate(){
    const taskDate = new Date(this.task.due_date)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
if (taskDate.toDateString() === tomorrow.toDateString()) {
        return "Tomorrow";
      } else if (taskDate.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
      } else {
        return taskDate.toLocaleDateString(); 
      }
    },
  },
  methods: {
    onDelete() {
        console.log("Delete event emitted with:", this.task._id, this.task.status);
      this.$emit("deleteTask", this.task._id);
    },
  },
};
</script>

<style scoped>

</style>
