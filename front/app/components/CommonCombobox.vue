<template>
  <div class="inline-block">
    <input
      ref="inputEl"
      v-model="input"
      name="common-combobox"
      placeholder="Select or input"
      role="combobox"
      aria-label="Category"
      aria-autocomplete="list"
      :aria-expanded="showOptions"
      :aria-controls="listboxId"
      :aria-activedescendant="activeOptionId"
      type="text"
      autocomplete="off"
      class="px-2 py-1 rounded w-40 border-slate-100 border"
      @focus="handleOptions(true)"
      @blur="handleInputBlur"
      @keydown="handleKeydown"
    >
    <div
      v-show="showOptions"
      ref="optionsEl"
      role="region"
      aria-label="Category options"
      tabindex="0"
      class="absolute max-h-40 bg-white overflow-auto p-1 rounded-md shadow-md"
      @blur="handleOptionsBlur"
      @keydown="handleKeydown"
    >
      <ul :id="listboxId" role="listbox" aria-label="Category options" class="divide-solid divide-y p-0">
        <li
          v-for="(option, index) in filteredOptions"
          :id="`${listboxId}-option-${index}`"
          :key="option.value"
          :data-option-index="index"
          role="option"
          :aria-selected="option.text === input"
          class="cursor-pointer p-1"
          :class="{ 'bg-gray-200': index === highlightedIndex || option.text === input }"
          @mousedown.prevent="selectOption(option.text)"
        >
          {{ option.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useId, useTemplateRef, watch } from 'vue'

interface Option {
  text: string
  value: string
}

const props = withDefaults(
  defineProps<{
    modelValue: string
    options?: Option[]
  }>(),
  { options: () => [] }
)

const canShowOptions = ref(false)
const input = ref('')
const highlightedIndex = ref(-1)
const listboxId = useId()
const inputEl = useTemplateRef<HTMLInputElement>('inputEl')
const optionsEl = useTemplateRef<HTMLElement>('optionsEl')

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select-option': [value: string]
}>()

watch(
  () => props.modelValue,
  (value) => {
    input.value = value
  },
  { immediate: true }
)

watch(input, (value) => emit('update:modelValue', value))

const filteredOptions = computed(() =>
  props.options.filter((option) => {
    if (!input.value) return true
    return option.text.toLowerCase().includes(input.value.toLowerCase())
  })
)

const inputHasEqualOption = computed(() =>
  filteredOptions.value.find((option) => option.text === input.value)
)

const showOptions = computed(() => canShowOptions.value && filteredOptions.value.length > 0)
const activeOptionId = computed(() => highlightedIndex.value >= 0
  ? `${listboxId}-option-${highlightedIndex.value}`
  : undefined)

watch(highlightedIndex, async (index) => {
  if (index < 0) return
  await nextTick()
  const option = optionsEl.value?.querySelector<HTMLElement>(`[data-option-index="${index}"]`)
  option?.scrollIntoView?.({ block: 'nearest' })
})

const selectOption = (value: string) => {
  const returnFocusToInput = optionsEl.value?.contains(document.activeElement) ?? false
  input.value = value
  canShowOptions.value = false
  highlightedIndex.value = -1
  emit('select-option', value)
  if (returnFocusToInput) inputEl.value?.focus()
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!canShowOptions.value) handleOptions(true)
    if (filteredOptions.value.length) {
      highlightedIndex.value = Math.min(highlightedIndex.value + 1, filteredOptions.value.length - 1)
    }
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!canShowOptions.value) handleOptions(true)
    if (filteredOptions.value.length) {
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
    }
  } else if (event.key === 'Enter') {
    const option = filteredOptions.value[highlightedIndex.value] || inputHasEqualOption.value
    if (showOptions.value && option) {
      event.preventDefault()
      selectOption(option.text)
    } else {
      handleOptions(false)
    }
  } else if (event.key === 'Escape') {
    event.preventDefault()
    canShowOptions.value = false
    highlightedIndex.value = -1
  }
}

const handleOptions = (value: boolean) => {
  canShowOptions.value = value
  if (value) {
    const selectedIndex = filteredOptions.value.findIndex((option) => option.text === input.value)
    highlightedIndex.value = selectedIndex
  } else {
    highlightedIndex.value = -1
    if (inputHasEqualOption.value) selectOption(inputHasEqualOption.value.text)
  }
}

const handleInputBlur = (event: FocusEvent) => {
  if (event.relatedTarget && optionsEl.value?.contains(event.relatedTarget as Node)) return
  handleOptions(false)
}

const handleOptionsBlur = (event: FocusEvent) => {
  if (event.relatedTarget === inputEl.value) return
  handleOptions(false)
}
</script>
