
<template>

<div v-if="userStore.user.isAuthenticated">

  <div class="personal-area">
    <RouterLink :to="{name:'profile', params:{'id': userStore.user.id}}">
     
    <button class="personal-area__btn">
      <i class="icon">
        <svg xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" height="25px" viewBox="0 0 20 20" version="1.1">
    
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -2159.000000)" fill="#707070">
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" id="profile_round-[#1342]">
      
      </path>
                  </g>
              </g>
          </g>
      </svg>
      </i>
     <span class="personal-area__text"> Личный кабинет</span></button>
    </RouterLink>
    <button @click="logout" to="/login" class="personal-area__btn"> 
      <i class="icon"><svg  xmlns="http://www.w3.org/2000/svg" fill="#707070" width="27px" height="27px" viewBox="0 0 24 24"><path d="M7.707,8.707,5.414,11H17a1,1,0,0,1,0,2H5.414l2.293,2.293a1,1,0,1,1-1.414,1.414l-4-4a1,1,0,0,1,0-1.414l4-4A1,1,0,1,1,7.707,8.707ZM21,1H13a1,1,0,0,0,0,2h7V21H13a1,1,0,0,0,0,2h8a1,1,0,0,0,1-1V2A1,1,0,0,0,21,1Z"/></svg></i>
      <span class="personal-area__text">Выйти</span>
      </button>
  </div>
  
  <nav  class="sidebar ">

 

    <header>

  
      
      <div class="image-text">
        <RouterLink to="/">
        <span class="image">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="45px" height="45px" viewBox="0 0 2917.000000 2917.000000" preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,2917.000000) scale(0.100000,-0.100000)" fill="#695CFE" stroke="none">
            <path d="M1051 27274 c-83 -22 -150 -63 -221 -134 -77 -77 -116 -144 -135 -237 -22 -101 -22 -15033 -1 -15134 36 -168 153 -302 324 -371 l57 -23 5973 -5 5972 -5 -1806 -1910 c-993 -1050 -1829 -1941 -1858 -1980 -114 -152 -187 -305 -234 -495 l-27 -105 -2 -2274 c-3 -2025 -2 -2281 12 -2335 47 -186 187 -323 378 -373 82 -21 205 -13 284 19 98 40 18194 9188 18265 9234 212 136 366 360 436 634 15 60 17 605 19 7545 3 5521 1 7498 -8 7548 -24 145 -122 280 -254 348 -89 46 -150 61 -250 60 -125 0 -227 -40 -331 -128 -15 -13 -12936 -13960 -12993 -14025 -4 -5 -2951 3144 -6549 6996 -3598 3852 -6562 7022 -6586 7044 -51 47 -129 89 -201 108 -65 18 -195 17 -264 -2z"/>
            </g>
            </svg>
        </span>
      </RouterLink>
      
        <div class="text logo-text">
          <span class="name">УУНИТ</span>
          <span class="profession">Web приложение</span>
        </div>
      </div>
      <i class="bx bx-chevron-right toggle"> </i>
    </header>
    <div class="menu-bar">
      <div class="menu">
      
        <ul class="menu-links">
          <RouterLink to="/specialties">
            <li  class="nav-link" :class="{ active: activeIndex === 0 }" @click="setActive(0)">
              <a href="#">
                <i class="icon">    
                  <svg class="dashboard-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#695CFE" version="1.1" id="Capa_1" viewBox="0 0 427.214 427.214" xml:space="preserve">
                  <path d="M269.819,342.099c0.008,5.523-4.462,9.907-9.985,9.916l-0.969,0.199c-0.005,0-0.01,0-0.016,0  c-5.516,0-9.991-4.566-9.999-10.083c-0.008-5.523,4.462-10.105,9.985-10.114l0.969,0.197c0.005,0,0.01,0,0.016,0  C265.335,332.214,269.811,336.581,269.819,342.099z M312.975,299.214c-0.007,0-0.014,0-0.021,0l-0.973-0.194  c-5.523,0.011-9.991,4.594-9.98,10.117c0.011,5.516,4.486,10.077,10,10.077c0.007,0,0.014,0,0.021,0l0.973-0.197  c5.523-0.011,9.991-4.399,9.98-9.922C322.964,303.579,318.489,299.214,312.975,299.214z M363.607,378.214c0,5.523-4.477,10-10,10  h-159c-5.523,0-10-4.477-10-10v-106c0-5.523,4.477-10,10-10h159c5.523,0,10,4.477,10,10V378.214z M204.607,368.214h139v-86h-139  v16.61l69.449-0.001c5.522,0,9.928,4.477,9.928,10c0,5.523-4.429,10-9.952,10l-69.425,0.001v13.39h21.852c5.523,0,10,4.477,10,10  s-4.477,10-10,10h-21.853V368.214z M90.02,67.791c1.681-44.888,38.679-66.604,72.342-67.785c0.233-0.009,0.468-0.009,0.701,0  c33.664,1.181,70.661,22.896,72.343,67.784c1.387,37.101-12.441,67.066-37.939,82.215c-10.719,6.367-22.736,9.551-34.754,9.551  c-12.017,0-24.035-3.184-34.753-9.551C102.461,134.857,88.633,104.891,90.02,67.791z M120.388,39.475  c12.326,4.939,26.977,7.814,42.325,8.227c15.349-0.413,30-3.288,42.326-8.227c-10.161-12.536-26.371-18.825-42.326-19.467  C146.758,20.65,130.549,26.938,120.388,39.475z M138.175,132.81c15.136,8.992,33.941,8.993,49.077,0  c19.006-11.292,29.274-34.718,28.168-64.272c-0.148-3.947-0.67-7.642-1.521-11.087c-14.927,6.201-32.598,9.79-50.934,10.251  c-0.168,0.005-0.335,0.005-0.503,0c-18.336-0.461-36.006-4.05-50.934-10.251c-0.851,3.446-1.374,7.141-1.521,11.088  C108.901,98.093,119.168,121.519,138.175,132.81z M366.579,407.214H181.424c-5.523,0-10,4.477-10,10s4.477,10,10,10h185.155  c5.523,0,10-4.477,10-10S372.102,407.214,366.579,407.214z M143.36,202.396c31.421-6.968,64.116,3.242,79.512,24.827  c3.207,4.498,9.453,5.542,13.948,2.334c4.497-3.207,5.542-9.452,2.334-13.948c-10.29-14.427-25.833-25.084-44.947-30.818  c-17.499-5.25-37.093-5.931-55.177-1.921c-34.717,7.699-58.889,30.899-64.66,62.061L50.802,372.165  c-0.542,2.921,0.245,5.932,2.145,8.216s4.717,3.605,7.688,3.605l76.971-0.002c5.523,0,10-4.478,10-10c0-5.523-4.478-10-10-10  l-64.948,0.001l21.378-115.412C100.178,215.406,130.576,205.231,143.36,202.396z"/>
                  </svg>
                </i>
                <span class="text nav-text">Специальности</span>
              </a>
            </li>
          </RouterLink>

          <RouterLink to="/teachers">
            <li  class="nav-link" :class="{ active: activeIndex === 1 }" @click="setActive(1)">
              <a href="#">
                  <i class="icon">
                    <svg class="dashboard-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#695CFE" version="1.1" id="Capa_1" viewBox="0 0 490 490" xml:space="preserve">
                      <g>
                          <g>
                              <path d="M71.424,121.863h-3.19V68.474c0-2.771-1.642-5.279-4.183-6.386c-2.537-1.107-5.494-0.604-7.524,1.281L41.861,76.986    c-2.818,2.618-2.981,7.026-0.363,9.846c2.617,2.819,7.025,2.982,9.844,0.364L54.3,84.45v37.413h-3.161    c-3.848,0-6.967,3.119-6.967,6.967c0,3.847,3.119,6.966,6.967,6.966h20.285c3.848,0,6.967-3.119,6.967-6.966    C78.391,124.982,75.271,121.863,71.424,121.863z"/>
                              <path d="M170.714,121.863h-3.162V68.474c0-2.771-1.642-5.277-4.18-6.385c-2.539-1.108-5.493-0.608-7.523,1.275l-14.689,13.617    c-2.821,2.616-2.989,7.025-0.373,9.846c2.616,2.822,7.023,2.989,9.845,0.374l2.987-2.77v37.432h-3.162    c-3.848,0-6.967,3.119-6.967,6.967c0,3.847,3.119,6.966,6.967,6.966h20.258c3.847,0,6.966-3.119,6.966-6.966    C177.68,124.982,174.561,121.863,170.714,121.863z"/>
                              <path d="M125.605,92.411h-10.182V82.223c0-3.848-3.119-6.967-6.967-6.967s-6.967,3.119-6.967,6.967v10.188H91.307    c-3.848,0-6.967,3.119-6.967,6.967c0,3.847,3.119,6.966,6.967,6.966h10.184v10.187c0,3.848,3.119,6.967,6.967,6.967    s6.967-3.119,6.967-6.967v-10.187h10.182c3.848,0,6.967-3.119,6.967-6.966C132.572,95.53,129.453,92.411,125.605,92.411z"/>
                              <g>
                                  <g>
                                      <path d="M247.795,115.696h-39.296c-3.847,0-6.966-3.118-6.966-6.966c0-3.847,3.119-6.966,6.966-6.966h39.296      c3.848,0,6.967,3.119,6.967,6.966C254.762,112.578,251.643,115.696,247.795,115.696z"/>
                                  </g>
                                  <g>
                                      <path d="M247.795,135.712h-39.296c-3.847,0-6.966-3.119-6.966-6.967c0-3.848,3.119-6.967,6.966-6.967h39.296      c3.848,0,6.967,3.119,6.967,6.967C254.762,132.593,251.643,135.712,247.795,135.712z"/>
                                  </g>
                              </g>
                              <g>
                                  <path d="M315.544,135.712h-36.341c-2.699,0-5.154-1.56-6.305-4.002c-1.148-2.442-0.782-5.329,0.939-7.408     c14.612-17.65,26.886-36.09,27.213-41.446c0.331-5.425-3.94-7.591-7.436-7.415c-4.1,0.207-7.443,3.33-7.443,7.423     c0,3.847-3.119,6.965-6.967,6.965c-3.848,0-6.967-3.118-6.967-6.965c0-11.776,9.59-21.357,21.377-21.357     c12.183,0,21.369,9.18,21.369,21.357c0,9.061-11.587,26.146-21.333,38.914h21.895c3.849,0,6.967,3.119,6.967,6.967     C322.511,132.593,319.392,135.712,315.544,135.712z"/>
                              </g>
                          </g>
                          <g>
                              <path d="M483.033,18.302H6.967C3.119,18.302,0,21.42,0,25.268V291.8c0,3.848,3.119,6.967,6.967,6.967h191.561    c10.312,12.452,22.877,21.244,37.539,26.193c13.507,4.559,28.775,5.717,44.589,3.433v136.339c0,3.847,3.119,6.966,6.967,6.966    h167.972c3.848,0,6.967-3.119,6.967-6.966V322.056c0-8.16-1.402-15.995-3.963-23.29h24.436c3.848,0,6.967-3.119,6.967-6.967    V25.268C490,21.42,486.881,18.302,483.033,18.302z M448.627,457.765h-23.629v-97.202c0-3.848-3.119-6.967-6.967-6.967    c-3.848,0-6.967,3.119-6.967,6.967v97.202H294.589V320.048c0-2.11-0.956-4.106-2.6-5.429c-1.646-1.323-3.802-1.828-5.861-1.375    c-21.586,4.74-61.445,6.307-85.885-36.462c-9.851-17.237-14-49.797-4.48-70.792c2.866-6.319,9.073-11.681,16.48-9.41    c6.819,2.092,10.666,9.343,8.574,16.164c-4.131,13.465-2.859,27.783,3.578,40.313c12.785,24.884,52.54,37.867,101.621,13.888    c9.596,5.366,20.64,8.438,32.393,8.438c12.791,0,24.746-3.632,34.901-9.908c30.618,0.693,55.317,25.799,55.317,56.583V457.765z     M305.744,208.785c0-29.037,23.625-52.661,52.664-52.661c29.041,0,52.666,23.624,52.666,52.661    c0,29.038-23.625,52.663-52.666,52.663C329.369,261.448,305.744,237.823,305.744,208.785z M476.066,284.833h-24.158    c-9.776-15.665-25.526-27.237-44.039-31.507c10.645-11.809,17.138-27.429,17.138-44.541c0-36.72-29.876-66.594-66.599-66.594    c-36.721,0-66.598,29.874-66.598,66.594c0,19.217,8.192,36.549,21.256,48.716c-36.648,15.294-66.982,7.282-76.278-10.812    c-4.769-9.282-5.71-19.887-2.65-29.861c4.344-14.165-3.645-29.225-17.81-33.569c-13.208-4.051-26.885,2.931-33.255,16.976    c-11.647,25.687-6.436,63.321,5.072,83.46c0.222,0.388,0.454,0.756,0.679,1.139H13.934V32.235h462.133V284.833z"/>
                              <path d="M389.31,413.406l-20.775-88.341l17.784-26.664c2.135-3.201,1.271-7.527-1.931-9.662c-3.199-2.133-7.525-1.27-9.661,1.931    l-14.34,21.5l-14.34-21.5c-2.135-3.201-6.459-4.064-9.662-1.931c-3.201,2.135-4.065,6.461-1.931,9.662l17.933,26.885    l-19.72,88.194c-0.449,2.008,0.014,4.115,1.264,5.751l21.105,27.608c1.304,1.706,3.204,2.715,5.351,2.736    c2.122,0,4.313-0.967,5.636-2.629l21.957-27.609C389.309,417.667,389.799,415.482,389.31,413.406z M360.388,431.28l-13.413-17.93    l13.413-61.086l14.587,61.043L360.388,431.28z"/>
                          </g>
                      </g>
                      </svg>
                  </i>
                
                <span class="text nav-text">Преподаватели</span>
              </a>
            </li>
            </RouterLink>
            <RouterLink to="/graduation">
            <li  class="nav-link" :class="{ active: activeIndex === 2 }" @click="setActive(2)">
              <a href="#">
                <i class="icon">
                  <svg class="dashboard-icon" width="50" height="50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" fill="#695CFE" viewBox="0 0 37 32" enable-background="new 0 0 37 32" xml:space="preserve">
                    <g>
                      <path d="M36.078,7.173L19.876,0.346c-0.865-0.365-1.858-0.365-2.728,0L0.922,7.183C0.362,7.42,0.009,7.944,0,8.554   c-0.009,0.607,0.329,1.143,0.881,1.394L2.59,10.73C2.538,10.809,2.5,10.898,2.5,11v9c0,0.005,0.003,0.01,0.003,0.016   c-1.172,0.207-2.066,1.226-2.066,2.456c0,1.111,0.733,2.043,1.736,2.368l-1.798,4.164c-0.271,0.629-0.206,1.326,0.18,1.912   C1.002,31.595,1.787,32,2.656,32l0.289-0.014c0.813-0.066,1.539-0.481,1.941-1.111c0.344-0.537,0.418-1.182,0.203-1.767   L3.541,24.89c1.086-0.272,1.896-1.248,1.896-2.418c0-1.188-0.833-2.18-1.945-2.433C3.493,20.025,3.5,20.014,3.5,20v-8.853l4,1.833   V20h0.01c0.103,2.257,5.827,3.439,11.49,3.439S30.387,22.257,30.49,20h0.01v-7.551l5.607-2.507C36.664,9.694,37.006,9.16,37,8.549   C36.993,7.938,36.641,7.41,36.078,7.173z M4.045,30.336c-0.235,0.368-0.677,0.613-1.186,0.654L2.656,31   c-0.531,0-1.005-0.236-1.266-0.634c-0.2-0.304-0.234-0.647-0.097-0.966l1.533-3.552l1.323,3.604   C4.259,29.746,4.221,30.061,4.045,30.336z M4.438,22.472c0,0.827-0.673,1.5-1.5,1.5s-1.5-0.673-1.5-1.5s0.673-1.5,1.5-1.5   S4.438,21.645,4.438,22.472z M29.5,18.419c-1.898-1.305-6.219-1.98-10.5-1.98s-8.602,0.675-10.5,1.98v-7.278   c0-1.097,3.185-2.641,10.266-2.641c7.004,0,10.734,1.57,10.734,2.703V18.419z M19,22.439c-6.409,0-10.5-1.48-10.5-2.5   s4.091-2.5,10.5-2.5s10.5,1.48,10.5,2.5S25.409,22.439,19,22.439z M35.699,9.03L30.5,11.354v-0.151   c0-2.181-4.825-3.703-11.734-3.703C11.922,7.5,7.5,8.929,7.5,11.141v0.741L1.297,9.038C1.017,8.911,0.999,8.646,1,8.567   s0.027-0.343,0.311-0.463l16.227-6.837c0.619-0.263,1.331-0.261,1.95,0l16.202,6.827c0.285,0.12,0.31,0.386,0.311,0.464   C36.001,8.638,35.981,8.903,35.699,9.03z"/>
                    </g>
                    </svg>
                </i>
                <span class="text nav-text">Выпуск</span>
              </a>
            </li>
            </RouterLink>
            <RouterLink :to="{name:'profile', params:{'id': userStore.user.id}}">
          <li  class="nav-link" :class="{ active: activeIndex === 3 }" @click="setActive(3)">
            <a href="#">
                <i class="icon">
                  <svg class="dashboard-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#695CFE" version="1.1" id="Capa_1" viewBox="0 0 490 490" xml:space="preserve">
                    <g>
                        <g>
                            <path d="M71.424,121.863h-3.19V68.474c0-2.771-1.642-5.279-4.183-6.386c-2.537-1.107-5.494-0.604-7.524,1.281L41.861,76.986    c-2.818,2.618-2.981,7.026-0.363,9.846c2.617,2.819,7.025,2.982,9.844,0.364L54.3,84.45v37.413h-3.161    c-3.848,0-6.967,3.119-6.967,6.967c0,3.847,3.119,6.966,6.967,6.966h20.285c3.848,0,6.967-3.119,6.967-6.966    C78.391,124.982,75.271,121.863,71.424,121.863z"/>
                            <path d="M170.714,121.863h-3.162V68.474c0-2.771-1.642-5.277-4.18-6.385c-2.539-1.108-5.493-0.608-7.523,1.275l-14.689,13.617    c-2.821,2.616-2.989,7.025-0.373,9.846c2.616,2.822,7.023,2.989,9.845,0.374l2.987-2.77v37.432h-3.162    c-3.848,0-6.967,3.119-6.967,6.967c0,3.847,3.119,6.966,6.967,6.966h20.258c3.847,0,6.966-3.119,6.966-6.966    C177.68,124.982,174.561,121.863,170.714,121.863z"/>
                            <path d="M125.605,92.411h-10.182V82.223c0-3.848-3.119-6.967-6.967-6.967s-6.967,3.119-6.967,6.967v10.188H91.307    c-3.848,0-6.967,3.119-6.967,6.967c0,3.847,3.119,6.966,6.967,6.966h10.184v10.187c0,3.848,3.119,6.967,6.967,6.967    s6.967-3.119,6.967-6.967v-10.187h10.182c3.848,0,6.967-3.119,6.967-6.966C132.572,95.53,129.453,92.411,125.605,92.411z"/>
                            <g>
                                <g>
                                    <path d="M247.795,115.696h-39.296c-3.847,0-6.966-3.118-6.966-6.966c0-3.847,3.119-6.966,6.966-6.966h39.296      c3.848,0,6.967,3.119,6.967,6.966C254.762,112.578,251.643,115.696,247.795,115.696z"/>
                                </g>
                                <g>
                                    <path d="M247.795,135.712h-39.296c-3.847,0-6.966-3.119-6.966-6.967c0-3.848,3.119-6.967,6.966-6.967h39.296      c3.848,0,6.967,3.119,6.967,6.967C254.762,132.593,251.643,135.712,247.795,135.712z"/>
                                </g>
                            </g>
                            <g>
                                <path d="M315.544,135.712h-36.341c-2.699,0-5.154-1.56-6.305-4.002c-1.148-2.442-0.782-5.329,0.939-7.408     c14.612-17.65,26.886-36.09,27.213-41.446c0.331-5.425-3.94-7.591-7.436-7.415c-4.1,0.207-7.443,3.33-7.443,7.423     c0,3.847-3.119,6.965-6.967,6.965c-3.848,0-6.967-3.118-6.967-6.965c0-11.776,9.59-21.357,21.377-21.357     c12.183,0,21.369,9.18,21.369,21.357c0,9.061-11.587,26.146-21.333,38.914h21.895c3.849,0,6.967,3.119,6.967,6.967     C322.511,132.593,319.392,135.712,315.544,135.712z"/>
                            </g>
                        </g>
                        <g>
                            <path d="M483.033,18.302H6.967C3.119,18.302,0,21.42,0,25.268V291.8c0,3.848,3.119,6.967,6.967,6.967h191.561    c10.312,12.452,22.877,21.244,37.539,26.193c13.507,4.559,28.775,5.717,44.589,3.433v136.339c0,3.847,3.119,6.966,6.967,6.966    h167.972c3.848,0,6.967-3.119,6.967-6.966V322.056c0-8.16-1.402-15.995-3.963-23.29h24.436c3.848,0,6.967-3.119,6.967-6.967    V25.268C490,21.42,486.881,18.302,483.033,18.302z M448.627,457.765h-23.629v-97.202c0-3.848-3.119-6.967-6.967-6.967    c-3.848,0-6.967,3.119-6.967,6.967v97.202H294.589V320.048c0-2.11-0.956-4.106-2.6-5.429c-1.646-1.323-3.802-1.828-5.861-1.375    c-21.586,4.74-61.445,6.307-85.885-36.462c-9.851-17.237-14-49.797-4.48-70.792c2.866-6.319,9.073-11.681,16.48-9.41    c6.819,2.092,10.666,9.343,8.574,16.164c-4.131,13.465-2.859,27.783,3.578,40.313c12.785,24.884,52.54,37.867,101.621,13.888    c9.596,5.366,20.64,8.438,32.393,8.438c12.791,0,24.746-3.632,34.901-9.908c30.618,0.693,55.317,25.799,55.317,56.583V457.765z     M305.744,208.785c0-29.037,23.625-52.661,52.664-52.661c29.041,0,52.666,23.624,52.666,52.661    c0,29.038-23.625,52.663-52.666,52.663C329.369,261.448,305.744,237.823,305.744,208.785z M476.066,284.833h-24.158    c-9.776-15.665-25.526-27.237-44.039-31.507c10.645-11.809,17.138-27.429,17.138-44.541c0-36.72-29.876-66.594-66.599-66.594    c-36.721,0-66.598,29.874-66.598,66.594c0,19.217,8.192,36.549,21.256,48.716c-36.648,15.294-66.982,7.282-76.278-10.812    c-4.769-9.282-5.71-19.887-2.65-29.861c4.344-14.165-3.645-29.225-17.81-33.569c-13.208-4.051-26.885,2.931-33.255,16.976    c-11.647,25.687-6.436,63.321,5.072,83.46c0.222,0.388,0.454,0.756,0.679,1.139H13.934V32.235h462.133V284.833z"/>
                            <path d="M389.31,413.406l-20.775-88.341l17.784-26.664c2.135-3.201,1.271-7.527-1.931-9.662c-3.199-2.133-7.525-1.27-9.661,1.931    l-14.34,21.5l-14.34-21.5c-2.135-3.201-6.459-4.064-9.662-1.931c-3.201,2.135-4.065,6.461-1.931,9.662l17.933,26.885    l-19.72,88.194c-0.449,2.008,0.014,4.115,1.264,5.751l21.105,27.608c1.304,1.706,3.204,2.715,5.351,2.736    c2.122,0,4.313-0.967,5.636-2.629l21.957-27.609C389.309,417.667,389.799,415.482,389.31,413.406z M360.388,431.28l-13.413-17.93    l13.413-61.086l14.587,61.043L360.388,431.28z"/>
                        </g>
                    </g>
                    </svg>
                </i>
              
              <span class="text nav-text">Профиль</span>
            </a>
          </li>
          </RouterLink>
          <RouterLink to="/my-tickets">
            <li class="nav-link">
              <a href="#">
                <i class="icon"><SpecialtiesIcon /></i>
                <span class="text nav-text">Мои заявки</span>
              </a>
            </li>
          </RouterLink>
          <RouterLink to="/tickets">
            <li class="nav-link">
              <a href="#">
                <i class="icon"><SpecialtiesIcon /></i>
                <span class="text nav-text">Ззявки</span>
              </a>
            </li>
          </RouterLink>
        
  
        </ul>
      </div>
      <div class="bottom-content">
        <li class="">
          <a @click="logout" to="/login">
            <i class="bx bx-log-out icon"></i>
            <span  class="text nav-text">Выйти</span>
          </a>
        </li>
        <li class="mode">
          <div class="sun-moon">
            <i class="bx bx-moon icon moon"></i>
            <i class="bx bx-sun icon sun"></i>
          </div>
          <span class="mode-text text">Dark mode</span>
          <div class="toggle-switch">
            <span class="switch"></span>
          </div>
        </li>
      </div>
    </div>
  </nav>

</div>


  <!-- <div v-else>

    <p>Вы не авторизованы</p>

    <RouterLink to="/login">
    <button type="button" >Войти</button>
    </RouterLink>
    <RouterLink to="/registration">
    <button type="button" >Зарегистрируйтесь</button>
    </RouterLink>

  </div> -->
  <Toast />
  <RouterView />

</template>

<style >
/* Google Font Import - Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
 font-family: 'Poppins', sans-serif;
}



body {
 min-height: 100vh;
 background-color: var(--body-color);
 transition: var(--tran-05);
}

::selection {
 background-color: var(--primary-color);
 color: #fff;
}

body.dark {
 --body-color: #18191a;
 --sidebar-color: #242526;
 --primary-color: #3a3b3c;
 --primary-color-light: #3a3b3c;
 --toggle-color: #fff;
 --text-color: #ccc;
}

.content {
  margin-top: 100px;

}

.personal-area {
  position: absolute;
  top: 25px;
  right: 25px;
}

.personal-area__btn {
  background: none;
  border: none;
  font-size: 17px;
  color: var(--text-color);
  font-weight: 600;
}

.personal-area__btn:first-child {
  margin-right: 15px;
}

/* ===== Sidebar ===== */
.sidebar {
 position: fixed;
 top: 0;
 left: 0;
 height: 100%;
 width: 250px;
 padding: 10px 14px;
 background: var(--sidebar-color);
 transition: var(--tran-05);
 z-index: 100;
}

.sidebar.close {
 width: 88px;
}

/* ===== Reusable code - Here ===== */
.sidebar li {
 height: 50px;
 list-style: none;
 display: flex;
 align-items: center;
 margin-top: 10px;
}

.sidebar header .image,
.sidebar .icon {
 min-width: 60px;
 border-radius: 6px;
}

.sidebar .icon {
 min-width: 60px;
 border-radius: 6px;
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 20px;
}

.sidebar .text,
.sidebar .icon {
 color: var(--text-color);
 transition: var(--tran-03);
}

.sidebar .text {
 font-size: 17px;
 font-weight: 500;
 white-space: nowrap;
 opacity: 1;
}

.sidebar.close .text {
 opacity: 0;
}

/* =========================== */
.sidebar header {
 position: relative;
}

.sidebar header .image-text {
 display: flex;
 align-items: center;
 border-bottom: 2px solid #695CFE;
 padding-bottom: 26px;
 
}

.sidebar header .logo-text {
 display: flex;
 flex-direction: column;
}

header .image-text .name {
 margin-top: 2px;
 font-size: 18px;
 font-weight: 600;
}

header .image-text .profession {
 font-size: 16px;
 margin-top: -2px;
 display: block;
}

.sidebar header .image {
 display: flex;
 align-items: center;
 justify-content: center;
}

.sidebar header .image img {
 width: 40px;
 border-radius: 6px;
}

.sidebar .nav-text {
   font-weight: 600;
}

.sidebar header .toggle {
 position: absolute;
 top: 50%;
 right: -25px;
 transform: translateY(-50%) rotate(180deg);
 height: 25px;
 width: 25px;
 background-color: var(--primary-color);
 color: var(--sidebar-color);
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 22px;
 cursor: pointer;
 transition: var(--tran-05);
}

body.dark .sidebar header .toggle {
 color: var(--text-color);
}

.sidebar.close .toggle {
 transform: translateY(-50%) rotate(0deg);
}

.sidebar .menu {
 margin-top: 40px;
}

.sidebar li.search-box {
 border-radius: 6px;
 background-color: var(--primary-color-light);
 cursor: pointer;
 transition: var(--tran-05);
}

.sidebar li.search-box input {
 height: 100%;
 width: 100%;
 outline: none;
 border: none;
 background-color: var(--primary-color-light);
 color: var(--text-color);
 border-radius: 6px;
 font-size: 17px;
 font-weight: 500;
 transition: var(--tran-05);
}

.sidebar li a {
 list-style: none;
 height: 100%;
 background-color: transparent;
 display: flex;
 align-items: center;
 height: 100%;
 width: 100%;
 border-radius: 6px;
 text-decoration: none;
 transition: var(--tran-03);
}
 .active {
  background-color: var(--primary-color);
  border-radius: 6px;
  color: white;
}


.sidebar li a:hover {
 background-color: var(--primary-color);
}

.sidebar li a:hover .icon,
.sidebar li a:hover .text {
 color: var(--sidebar-color);
}

body.dark .sidebar li a:hover .icon,
body.dark .sidebar li a:hover .text {
 color: var(--text-color);
}

.sidebar .menu-bar {
 height: calc(100% - 55px);
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 overflow-y: scroll;
}

.menu-bar::-webkit-scrollbar {
 display: none;
}

.sidebar .menu-bar .mode {
 border-radius: 6px;
 background-color: var(--primary-color-light);
 position: relative;
 transition: var(--tran-05);
}

.menu-bar .mode .sun-moon {
 height: 50px;
 width: 60px;
}

.mode .sun-moon i {
 position: absolute;
}

.mode .sun-moon i.sun {
 opacity: 0;
}

body.dark .mode .sun-moon i.sun {
 opacity: 1;
}

body.dark .mode .sun-moon i.moon {
 opacity: 0;
}

.bottom-content {
 margin-bottom: 26px;
}

.menu-bar .bottom-content .toggle-switch {
 position: absolute;
 right: 0;
 height: 100%;
 min-width: 60px;
 display: flex;
 align-items: center;
 justify-content: center;
 border-radius: 6px;
 cursor: pointer;
}

.toggle-switch .switch  {
 position: relative;
 height: 22px;
 width: 40px;
 border-radius: 25px;
 background-color: var(--toggle-color);
 transition: var(--tran-05);
}

.switch::before {
 content: '';
 position: absolute;
 height: 15px;
 width: 15px;
 border-radius: 50%;
 top: 50%;
 left: 5px;
 transform: translateY(-50%);
 background-color: var(--sidebar-color);
 transition: var(--tran-04);
}

body.dark .switch::before {
 left: 20px;
}

.home {
 position: absolute;
 top: 0;
 top: 0;
 left: 250px;
 height: 100vh;
 width: calc(100% - 250px);
 background-color: var(--body-color);
 transition: var(--tran-05);
}

.home .text {
 font-size: 30px;
 font-weight: 500;
 color: var(--text-color);
 padding: 12px 60px;
}

.sidebar.close~.home {
 left: 78px;
 height: 100vh;
 width: calc(100% - 78px);
}

body.dark .home .text {
 color: var(--text-color);
}

.active .dashboard-icon{
  fill: var(--sidebar-color);
  stroke: var(--sidebar-color);
}

.active .nav-text {
  color: #fff !important;
}

@media screen and (max-width: 420px) {

  .personal-area__text {
    display: none;
  }
  
  .icon:first-child {
    margin-right: 10px;
  }
}

 </style>






<script>
    import axios from 'axios'
    import Toast from '@/components/Toast.vue'
    import { useUserStore } from '@/stores/user'
    import { ref } from 'vue';



    export default {
        setup() {
            const userStore = useUserStore()
            const activeIndex = ref(100);

            function setActive(index) {
      activeIndex.value = index;
    }
            
            return {
                userStore,
                activeIndex,
                setActive,
            }
        },

        mounted() {
    const body = document.querySelector("body"),
        sidebar = body.querySelector("nav"),
        toggle = body.querySelector(".toggle"),
        table = body.querySelector("table"),
        searchBtn = body.querySelector(".search-box"),
        modeSwitch = body.querySelector(".toggle-switch"),
        modeText = body.querySelector(".mode-text");

    if (toggle && sidebar) {
        toggle.addEventListener("click", () => {
            sidebar.classList.toggle("close");
        });
    }

    if (modeSwitch && body && table) {
        modeSwitch.addEventListener("click", () => {
            body.classList.toggle("dark");
            table.classList.toggle("table-dark");

            if (body.classList.contains("dark")) {
                modeText.innerText = "Light mode";
            } else {
                modeText.innerText = "Dark mode";
            }
        });
    }

    (function() {
        matchMedia('only screen and (min-width:980px)').addEventListener('change', () => sidebar.classList.toggle("close"));
    })();
},

        components: {
            Toast
        },

        methods: {
          logout() {
            console.log('Log out')

            this.userStore.removeToken()

            this.$router.push('/login')
        }

        },

        beforeCreate() {
            this.userStore.initStore()
            
            const token = this.userStore.user.access

            if (token) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
             
            } else {
                axios.defaults.headers.common["Authorization"] = "";
            }
        }
   
    }
</script>