<template>
  <div class="inline-flex items-center">
    <CommonChip v-if="!data.isEditingCategory" :background-color="data.color">
      {{ data.name }}
    </CommonChip>
    <div v-else class="inline-flex items-center">
      <CommonCombobox v-model="data.name" :options="categoriesOptions" @select-option="setCategory" />
      <input
        v-model="data.color"
        type="color"
        class="TransactionsDetailsCategory__inputColor appearance-none bg-transparent rounded-md h-7 cursor-pointer ml-2"
      />
    </div>
    <button class="p-1 ml-2 cursor-pointer text-slate-500" @click="toggleCategoryEditing">
      <img
        :src="data.isEditingCategory ? '/images/x-circle.svg' : '/images/pencil-square.svg'"
        :alt="data.isEditingCategory ? 'close' : 'edit'"
      />
    </button>
    <button
      v-if="data.isEditingCategory && data.changedInput"
      class="px-2 ml-2 cursor-pointer text-white bg-green-500 rounded-md"
      @click="emitSaveCategory"
    >
      Save
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, watch } from 'vue'
import CategoryService from '~/services/category.service'
import type { Category } from '~/types'

const props = defineProps<{ category: Category }>()
const emit = defineEmits<{ (event: 'save', value: Category): void }>()
const categoryService = new CategoryService()
const data = reactive({
  isEditingCategory: false,
  categories: [] as Category[],
  name: '',
  color: '',
  changedInput: false
})

const categoriesOptions = computed(() =>
  data.categories.map((category) => ({ text: category.name || '', value: category.id || '' }))
)

onMounted(async () => {
  const result = await categoryService.getCategoriesRequest()
  data.categories = result.data.categories
})

const updateCategoryNameAndColor = ({ name, color }: Category) => {
  data.name = name || ''
  data.color = color ? (color.includes('#') ? color : `#${color}`) : ''
}

const resetEditing = async () => {
  updateCategoryNameAndColor(props.category)
  await nextTick()
  data.changedInput = false
}

const toggleCategoryEditing = () => {
  data.isEditingCategory = !data.isEditingCategory
  if (!data.isEditingCategory) resetEditing()
}

const setCategory = (name: string) => {
  const category = data.categories.find((item) => item.name === name)
  if (category) updateCategoryNameAndColor(category)
}

const emitSaveCategory = () => {
  emit('save', { name: data.name, color: data.color.replace('#', '') })
  data.isEditingCategory = false
}

watch(() => props.category, (value) => updateCategoryNameAndColor(value), { immediate: true })
watch([() => data.name, () => data.color], ([name, color], [previousName, previousColor]) => {
  if ((name && name !== previousName) || (color && color !== previousColor)) data.changedInput = true
})
</script>

<style scoped>
.TransactionsDetailsCategory__inputColor::-webkit-color-swatch {
  border-radius: 5px;
  border: none;
}

.TransactionsDetailsCategory__inputColor::-webkit-color-swatch-wrapper {
  padding: 0;
}
</style>
