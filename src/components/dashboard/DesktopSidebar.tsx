import { navigation } from "../../types/navigation";

interface DesktopSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function DesktopSidebar(props: DesktopSidebarProps) {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div className="flex justify-center items-center h-16 flex-shrink-0 px-4 bg-gray-900">
          <img
            className="h-8 w-auto"
            src="/overact.png"
            alt="Overact"
          />
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <button
                type="button"
                key={item.name}
                onClick={() => {props.setActiveTab(item.name)}}
                className={
                  props.activeTab == item.name
                    ? 'bg-gray-900 text-white group transition flex items-center px-2 py-2 text-sm font-medium rounded-md w-full' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white group transition flex items-center px-2 py-2 text-sm font-medium rounded-md w-full'
                }
              >
                <item.icon
                  className={
                    props.activeTab == item.name
                      ? 'text-gray-300 mr-3 flex-shrink-0 h-6 w-6'
                      : 'text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6'
                  }
                  aria-hidden="true"
                />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
