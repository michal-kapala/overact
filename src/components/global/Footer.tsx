import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer: FC<any> = () => {
    return(
      <>
      {/* Page Footer */}
      <footer id="page-footer" className="flex flex-none items-center bg-white py-2">
        <div className="text-center flex flex-col md:text-left md:flex-row md:justify-between text-sm container xl:max-w-7xl mx-auto px-4 lg:px-8">
          <div className="pt-4 pb-1 md:pb-4">
            <Link href="https://github.com/michal-kapala/overact">
              <a className="flex group items-center justify-center font-medium" target="_blank">
                <div className="flex pr-2">
                  <Image src="/GitHub-Mark-64px.png" width={32} height={32} />
                </div>
                <h3 className="py-2 text-black group-hover:text-blue-400">Overact</h3>
              </a>
            </Link>
          </div>
          <div className="pb-4 pt-1 md:pt-4 inline-flex items-center justify-center">
            <span></span>
            <span>
              Made with <a href="https://tailwindui.com/" className="font-medium text-blue-600 hover:text-blue-400" target="_blank">TailwindUI</a> and <a href="https://tailkit.com/" className="font-medium text-blue-600 hover:text-blue-400" target="_blank">Tailkit</a>
            </span>
          </div>
        </div>
      </footer>
      {/* END Page Footer */}
      </>
    );
}
