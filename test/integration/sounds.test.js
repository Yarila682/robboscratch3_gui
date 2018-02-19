import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    findByXpath,
    getDriver,
    getLogs,
    loadUri,
    rightClickText,
    scope
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

describe('Working with sounds', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Adding a sound', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');
        await clickText('Sounds');

        // Delete the sound
        await rightClickText('Meow', scope.soundsTab);
        await clickText('delete', scope.soundsTab);
        await driver.switchTo().alert()
            .accept();

        // Add it back
        await clickXpath('//button[@title="Add Sound"]');
        let el = await findByXpath("//input[@placeholder='what are you looking for?']");
        await el.sendKeys('meow');
        await clickText('Meow', scope.modal); // Should close the modal

        // Add a new sound
        await clickXpath('//button[@title="Add Sound"]');
        el = await findByXpath("//input[@placeholder='what are you looking for?']");
        await el.sendKeys('chom');
        await clickText('Chomp'); // Should close the modal, then click the sounds in the selector
        await findByXpath("//input[@value='Chomp']"); // Should show editor for new sound

        await clickXpath('//button[@title="Play"]');

        await clickText('Louder');
        await clickText('Softer');
        await clickText('Faster');
        await clickText('Slower');
        await clickText('Robot');
        await clickText('Echo');
        await clickText('Reverse');

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    // Regression test for gui issue #1320
    test('Switching sprites with different numbers of sounds', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');

        // Add a sound so this sprite has 2 sounds.
        await clickText('Sounds');
        await clickXpath('//button[@title="Add Sound"]');
        await clickText('A Bass'); // Closes the modal

        // Now add a sprite with only one sound.
        await clickXpath('//button[@title="Add Sprite"]');
        await clickText('Abby'); // Doing this used to crash the editor.

        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for error

        // Make sure the 'Oops' screen is not visible
        const content = await driver.getPageSource();
        expect(content.indexOf('Oops')).toEqual(-1);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });
});
