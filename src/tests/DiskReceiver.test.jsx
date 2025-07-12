import {vi, describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DiskReceiver from "../components/DiskReceiver.jsx";

describe("DiskReceiver Suite", ()=> {
    it("dropping a draggable will call addSelectedInput", async () => {
        const addSelectedInput = vi.fn();
        const user = userEvent.setup();
        render(<DiskReceiver addSelectedInput={addSelectedInput}></DiskReceiver>)

        //not sure how to simulate dropping a draggable
    });
    it("NOT dropping a draggable will NOT call addSelectedInput", async () => {
        const addSelectedInput = vi.fn();
        render(<DiskReceiver addSelectedInput={addSelectedInput}></DiskReceiver>)

        expect(addSelectedInput).not.toHaveBeenCalled();
    })
});