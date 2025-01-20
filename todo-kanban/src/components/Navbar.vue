<template> 


    <nav class="bg-white border-gray-200">
        
        <div class="w-full flex flex-wrap items-center justify-between  p-4 px-14">
           
            <div  class="flex items-center space-x-3 rtl:space-x-reverse gap-4">
                <div class="text-gray-400 border border-gray-200 p-3 rounded-xl">
                  
                    <i class="pi pi-arrow-left text-xl" style="font-size: 1.5rem"></i>
                </div>
                <img src="https://thumbs.dreamstime.com/b/apple-logo-19106337.jpg" class="h-14 rounded-xl w-14" alt="Flowbite Logo" />
              <div class="block">
                  <span class="self-center text-2xl font-semibold whitespace-nowrap text-black">Apple</span>
                  <p class="text-gray-400">5 Board 24 members</p>
              </div>
            </div>



            <div class="flex md:order-2 items-center gap-3">
                <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search"
                    aria-expanded="false"
                    class="md:hidden text-gray-500  focus:outline-none  rounded-lg text-sm p-2.5 ">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span class="sr-only">Search</span>
                </button>
                <div class="relative hidden md:block">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 " aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span class="sr-only">Search icon</span>
                    </div>
                    <input type="text" id="search-navbar"
                        class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white "
                        placeholder="Search...">
                        
                </div>
               
                <div class="text-gray-400 border border-gray-200 p-2 rounded-xl flex text-center items-center">
                  
                    <i class="pi pi-cog text-xl text-gray-400" style="font-size: 1.5rem"></i>
                </div>
            </div>
        </div>
    </nav>

  

</template>



   
