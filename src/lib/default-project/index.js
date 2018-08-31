import {TextEncoder} from 'text-encoding';
import projectJson from './project.json';

/* eslint-disable import/no-unresolved */
import popWav from '!buffer-loader!./83a9787d4cb6f3b7632b4ddfebf74367.wav';
import meowWav from '!buffer-loader!./83c36d806dc92327b9e7049a565c6bff.wav';
import backdrop from '!buffer-loader!./739b5e2a2435f6e1ec2993791b423146.png';
import penLayer from '!buffer-loader!./5c81a336fab8be57adc039a8a2b33ca9.png';
import costume1 from '!raw-loader!./ROB1_end.svg';
import costume2 from '!raw-loader!./ROB2_end.svg';
import costume3 from '!raw-loader!./ROB3_end.svg';
import costume4 from '!raw-loader!./ROB4_end.svg';
/* eslint-enable import/no-unresolved */

const encoder = new TextEncoder();
export default [{
    id: 0,
    assetType: 'Project',
    dataFormat: 'JSON',
    data: JSON.stringify(projectJson)
}, {
    id: '83a9787d4cb6f3b7632b4ddfebf74367',
    assetType: 'Sound',
    dataFormat: 'WAV',
    data: popWav
}, {
    id: '83c36d806dc92327b9e7049a565c6bff',
    assetType: 'Sound',
    dataFormat: 'WAV',
    data: meowWav
}, {
    id: '739b5e2a2435f6e1ec2993791b423146',
    assetType: 'ImageBitmap',
    dataFormat: 'PNG',
    data: backdrop
}, {
    id: '5c81a336fab8be57adc039a8a2b33ca9',
    assetType: 'ImageBitmap',
    dataFormat: 'PNG',
    data: penLayer
}, {
    id: 'ROB1_end',
    assetType: 'ImageVector',
    dataFormat: 'SVG',
    data: encoder.encode(costume1)
},{
    id: 'ROB2_end',
    assetType: 'ImageVector',
    dataFormat: 'SVG',
    data: encoder.encode(costume2)
},{
    id: 'ROB3_end',
    assetType: 'ImageVector',
    dataFormat: 'SVG',
    data: encoder.encode(costume3)
}, {
    id: 'ROB4_end',
    assetType: 'ImageVector',
    dataFormat: 'SVG',
    data: encoder.encode(costume4)
}];
