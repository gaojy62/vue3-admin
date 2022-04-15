<script setup lang="ts">
import Login from './Login.vue'
import Register from './Register.vue'

const isRegister = ref(false)
</script>
<template>
  <div
    class="flex flex-col relative w-screen h-screen max-h-screen overflow-hidden bg-[#F79F1F] bg-img bg-size bg-position bg-no-repeat animate-movement"
  >
    <header class="flex items-center h-[10vh]">
      <div class="text-shadow-custom text-[30px] pl-9 text-transparent">whoami</div>
    </header>
    <main class="flex justify-around items-center h-[90vh] <lg:flex-col">
      <transition name="fade">
        <div class="bg-model">
          <Login>
            <template #footer>
              <a class="text-blue-500" @click="isRegister = !isRegister">register</a>
            </template>
          </Login>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="isRegister" class="bg-model">
          <Register />
        </div>
      </transition>
    </main>
  </div>
</template>
<style scoped>
.bg-img {
  background-image: radial-gradient(
      closest-side,
      rgba(235, 105, 78, 1),
      rgba(235, 105, 78, 0)
    ),
    radial-gradient(closest-side, rgba(243, 11, 164, 1), rgba(243, 11, 164, 0)),
    radial-gradient(
      closest-side,
      rgba(254, 234, 131, 1),
      rgba(254, 234, 131, 0)
    ),
    radial-gradient(
      closest-side,
      rgba(170, 142, 245, 1),
      rgba(170, 142, 245, 0)
    ),
    radial-gradient(
      closest-side,
      rgba(248, 192, 147, 1),
      rgba(248, 192, 147, 0)
    );
}
.bg-size {
  background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
    110vmax 110vmax, 90vmax 90vmax;
}
.bg-position {
  background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
    -30vmax -10vmax, 50vmax 50vmax;
}
.animate-movement {
  animation: movement 10s linear infinite;
}

@keyframes movement {
  0%,
  100% {
    background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
      110vmax 110vmax, 90vmax 90vmax;
    background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
      -30vmax -10vmax, 50vmax 50vmax;
  }
  25% {
    background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax,
      90vmax 90vmax, 60vmax 60vmax;
    background-position: -60vmax -90vmax, 50vmax -40vmax, 0vmax -20vmax,
      -40vmax -20vmax, 40vmax 60vmax;
  }
  50% {
    background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax,
      60vmax 60vmax, 80vmax 80vmax;
    background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax,
      20vmax 10vmax, 30vmax 70vmax;
  }
  75% {
    background-size: 90vmax 90vmax, 90vmax 90vmax, 100vmax 100vmax,
      90vmax 90vmax, 70vmax 70vmax;
    background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax,
      -10vmax 10vmax, 40vmax 60vmax;
  }
}

.text-shadow-custom {
  text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.6),
    0px 4px 4px rgba(0, 0, 0, 0.05);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}

.fade-enter-from,
.fade-leave-to {
  transition-duration: opacity 0.5s linear;
  opacity: 0;
}
</style>
