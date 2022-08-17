<template>
  <div class="hover-card selectable my-3" :title="house.year">
    <router-link :to="{ name: 'House', params: { houseId: house.id } }">
      <img class="img-fluid" :src="house.img" alt="">
    </router-link>
  </div>
</template>


<script>
import { House } from '../models/House.js';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    house: { type: House, required: true }
  },
  setup() {
    return {
      editHouse(house) {
        housesService.setActiveHouse(house)
      },
      async deleteHouse(house) {
        try {
          const yes = await Pop.confirm('Delete the house?')
          if (!yes) { return }
          await housesService.deleteHouse(house.id)
        } catch (error) {
          logger.error('[Deleting House]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.hover-card {
  transition: all .15s linear;

  &:hover {
    transform: translateY(2px);
    border-radius: 10px;
  }
}

img {
    max-height: 50vh;
    min-width: 100%;
}
</style>