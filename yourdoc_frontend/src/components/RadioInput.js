export function RadioInput({ options = [], label, name, onChange }) {
  return <>
    <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">{label}</h3>
    <ul class="grid w-full gap-6 md:grid-cols-2">
      {options.map(o => <li key={o.value} onClick={() => onChange(o.value)}>
        <input type="radio" id={o.value} name={name} value={o.value} class="hidden peer" required />
        <label for={o.value} class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div class="block">
            <div class="w-full text-lg font-semibold">{o.label}</div>
          </div>
        </label>
      </li>
      )}
    </ul>
  </>
}

export function RadioInput2({ options = [], label, name, onChange, isRequired }) {
  return <>
    <h3 class="text-gray-900 dark:text-white">{label}</h3>
    <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {options.map(o => <li key={o.value} onClick={() => onChange?.(o.value)} class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center pl-3">
          <input required={isRequired} id={o.value} type="radio" value={o.value} name={name} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
          <label for={o.value} class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{o.label}</label>
        </div>
      </li>
      )}
    </ul>
  </>
}