export function ListCard({ title, headerComponent, onViewAllClick, listData = [] }) {
  // list item should look like {title, subTitle, avatarURL, rightText, onItemClick }
  return <div className="min-w-[500px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{title}</h5>
      {onViewAllClick
        ? <button onClick={onViewAllClick} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </button>
        : null
      }
    </div>
    {headerComponent}
    <div className="flow-root">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {listData.map(ld => <li onClick={ld.onItemClick} className="py-3 sm:py-4 hover:dark:bg-gray-900 cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {ld.avatarURL
                ? <img className="w-8 h-8 rounded-full" src={ld.avatarURL} alt="Avatar" />
                : null
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {ld.title}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {ld.subTitle}
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {ld.rightText}
            </div>
          </div>
        </li>
        )}
      </ul>
    </div>
  </div>

}