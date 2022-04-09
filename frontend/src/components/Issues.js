import React from 'react'
import "./style/issue.css"
export default function Issues() {
    return (
        <div class="wrapper-issue">
            <form action="">
                <h1>Add an issue</h1>
                <div id="wizard">
                    <section>
                        <div class="form-row"> <input type="text" class="form-control" placeholder="Location" /> </div>
                        <div class="form-row"> <input type="text" class="form-control" placeholder="Issue" /> </div>
                    </section>
                    <section>
                        <div class="form-row"> <textarea name="" id="" class="form-control" placeholder="Issue Description"></textarea> </div>
                        <div className='checkBox'>
                            <label htmlFor="Anonymous">Anonymous</label>
                            <input id="Anonymous" type="checkbox" />
                        </div>
                    </section>
                </div>
                <button>Add</button>
            </form>
        </div >
    )
}
