<template>
  <div class="inline-flex items-center">
    <common-chip v-if="!data.isEditingCategory" :background-color="data.color">
      {{ data.name }}
    </common-chip>
    <div v-else class="inline-flex items-center">
      <common-combobox
        v-model="data.name"
        :options="categoriesOptions"
        @select-option="setCategory"
      />
      <input
        v-model="data.color"
        type="color"
        class="TransactionsDetailsCategory__inputColor appearance-none bg-transparent rounded-md h-7 cursor-pointer ml-2"
      />
    </div>
    <button class="p-1 ml-2 text-slate-500" @click="toggleCategoryEditing">
      <img
        :src="data.isEditingCategory ? '/images/x-circle.svg' : '/images/pencil-square.svg'"
        :alt="data.isEditingCategory ? 'close' : 'edit'"
      />
    </button>
    <button
      v-if="data.isEditingCategory && data.changedInput"
      class="px-2 ml-2 text-white bg-green-500 rounded-md"
      @click="emitSaveCategory"
    >
      Save
    </button>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, watch, nextTick } from 'vue'
import CategoryService from '~/services/category.service'
const categoryService = new CategoryService()

const props = defineProps({
  category: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['save'])

const data = reactive({
  isEditingCategory: false,
  categories: null,
  name: null,
  color: null,
  changedInput: false
})

onMounted(() => {
  getCategories()
})

const categoriesOptions = computed(() =>
  data.categories?.map((category) => ({ text: category.name, value: category.id }))
)

const getCategories = async () => {
  const result = await categoryService.getCategoriesRequest()
  data.categories = result.data.categories
}

const toggleCategoryEditing = () => {
  data.isEditingCategory = !data.isEditingCategory
  if (!data.isEditingCategory) {
    resetEditing()
  }
}

const setCategory = (value) => {
  const { color } = data.categories.find((category) => category.name === value)
  updateCategoryNameAndColor(value, color)
}

const emitSaveCategory = () => {
  const { name, color } = data

  emit('save', {
    name,
    color: color ? color.replace('#', '') : ''
  })

  data.isEditingCategory = false
}

const updateCategoryNameAndColor = (name, color) => {
  data.name = name
  data.color = color && color.includes('#') ? color : `#${color}`
}

const resetEditing = async () => {
  const { name, color } = props.category

  data.name = name
  data.color = color && color.includes('#') ? color : `#${color}`
  await nextTick()
  data.changedInput = false
}

watch(
  () => props.category,
  (value) => {
    const { name, color } = value

    updateCategoryNameAndColor(name, color)
  },
  { immediate: true }
)

watch(
  () => data.name,
  (value, oldValue) => {
    if (value && oldValue) {
      data.changedInput = true
    }
  }
)

watch(
  () => data.color,
  (value, oldValue) => {
    if (value && oldValue) {
      data.changedInput = true
    }
  }
)
</script>

<style lang="scss" scoped>
.TransactionsDetailsCategory__inputColor {
  &::-webkit-color-swatch {
    border-radius: 5px;
    border: none;
  }
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
}
</style>
