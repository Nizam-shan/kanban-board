<template>
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Add Task</h3>
            <form @submit="submitTask" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        placeholder="Enter title"
                        v-model="task.title"
                        required
                        class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        placeholder="Enter description"
                        v-model="task.descriptions"
                        class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                    ></textarea>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        placeholder="Enter date"
                        v-model="task.due_date"
                        required
                        class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Assignee</label>
                    <input
                        type="text"
                        placeholder="Enter user"
                        v-model="task.assignee"
                        required
                        class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 text-black"
                    />
                </div>

                <div class="flex justify-end space-x-3">
                    <button
                        type="button"
                        @click="$emit('close')"
                        class="px-4 py-2 bg-red-500 text-black rounded-md "
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        class="px-4 py-2 bg-blue-500 text-black rounded-md"
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: ['section'],
    emits: ['addTask', 'close'],
    setup(props, { emit }) {
        const task = ref({ title: '', descriptions: '', due_date: '', assignee: '', status: props.section });

        const submitTask = (e) => {
            e.preventDefault();
            if (!task.value.title.trim()) {
                alert('Task title is required');
                return;
            }
              const formattedTask = {
        title: task.value.title,
        descriptions: task.value.descriptions,
        due_date: task.value.due_date,
        assignee: task.value.assignee,
        status: typeof task.value.status === 'object' ? task.value.status.title : task.value.status,
    };
            emit('addTask', formattedTask);
            emit('close');
        };
        return { task, submitTask };
    },
};
</script>
