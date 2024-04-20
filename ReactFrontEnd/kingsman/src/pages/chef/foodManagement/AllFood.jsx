import React from 'react'
import { Card } from "flowbite-react";


export default function AllFood() {
    return (
        <div className='w-full ml-3 mt-6'>
            <table>
                <tr>
                    <td>
                        <Card className="max-w-sm w-full" imgSrc="../src/image/logo.png" horizontal>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </Card>

                    </td>
                </tr>


            </table>


        </div>
    )
}
