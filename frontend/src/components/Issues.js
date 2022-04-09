import React from 'react'

export default function Issues() {
    return (
        <div class="wrapper">
            <form action="">
                <div id="wizard">
                    <h4></h4>
                    <section>
                        <div class="form-row"> <input type="text" class="form-control" placeholder="country" /> </div>
                        <div class="form-row"> <input type="text" class="form-control" placeholder="Streest adress" /> </div>
                        <div class="form-row"> <input type="text" class="form-control" placeholder="Issue Heading" /> </div>
                    </section>
                    <h4></h4>
                    <section>
                        <div class="form-row" style="margin-bottom: 18px"> <textarea name="" id="" class="form-control" placeholder="Issue" style="height: 108px"></textarea> </div>
                        <input type="checkbox" />
                        <label for="Anonymous"> Anonymous</label>
                    </section>
                </div>
            </form>
        </div >
    )
}
