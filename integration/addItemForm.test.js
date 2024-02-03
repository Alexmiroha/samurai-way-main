describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
// APIs from jest-puppeteer
        await page.goto('http://localhost:6006/iframe.html?globals=backgrounds.grid:!false;backgrounds.value:!hex(F8F8F8)&args=&id=todolists-additemform--add-item-form-story',
            {waitUntil: "networkidle2"});

        const image = await page.screenshot();

// API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

// 2:53:52