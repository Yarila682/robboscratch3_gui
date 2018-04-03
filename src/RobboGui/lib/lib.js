

const immutable_copy = function(data_structure_element){

  if (Array.isArray(data_structure_element)){

    let buf_arr = [];

        data_structure_element.forEach(function(item,index){

                buf_arr[index] = immutable_copy(item);

        });

      return buf_arr;


  }else if (typeof (data_structure_element) == 'object'){



        let buf_object = {};

        for (var property in data_structure_element) {
        if (data_structure_element.hasOwnProperty(property)) {

              //if ((typeof(property) != 'array') || (typeof(property) != 'object')){

                Object.defineProperty(buf_object, property, {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: immutable_copy(data_structure_element[property])
                    });


        }
    }

    return buf_object;

  }else{

      let buf;

      buf = data_structure_element;

      return buf;

  }


}

const color_filter = function(filter_table_table){



}

export {

    immutable_copy,
    color_filter,

};
