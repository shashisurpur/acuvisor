import * as Yup from 'yup';

// var schema = Yup.object().shape({});

const automaticValidationSchema = (data) => {

    // console.log(schema,"recursive schema")
    let schema = Yup.object().shape({});
    data.map((field, index) => {
        //console.log('non required',field)
        if (field.required) {
            // console.log('required', field)
            if (field.dataType === 'String' && field.validation.regex !== undefined) {
                schema = Yup.object().shape(
                    {
                        ...schema.fields,
                        [field.name]: Yup.string()
                            .required(`${field.label} is required`)
                            .matches(new RegExp(field.validation.regex), `Please provide valid ${field.label} `)

                    })
            }else if (field.dataType === 'String' || field.dataType === 'Date') {
                // console.log(schema.fields,"String")
                schema = Yup.object().shape(
                    {
                        ...schema.fields,
                        [field.name]: Yup.string()
                            .required(`${field.label} is required`)
                            .min(field.validation.minlength, `${field.label} must be at least ${field.validation.minlength} characters`)
                            .max(field.validation.maxlength, `${field.label} must not exceed ${field.validation.maxlength} characters`)
                    })
            }else if (field.dataType === 'Boolean') {
                // console.log(schema.fields,"boolean")
                schema = Yup.object().shape(
                    {
                        ...schema.fields,
                        [field.name]: Yup.string()
                            .required(`${field.label} is required`)

                    })
            }
            else if (field.dataType === 'number') {
                // console.log(schema.fields,"number")
                schema = Yup.object().shape(
                    {
                        ...schema.fields,
                        [field.name]: Yup.string()
                            .required(`${field.label} is required`)
                            .min(field.validation.minlength, `${field.label} must be at least ${field.validation.minlength} digits`)
                            .max(field.validation.maxlength, `${field.label} must not exceed ${field.validation.maxlength} digits`)
                            .matches(new RegExp(field.validation.regex), `Please provide valid ${field.label} `)
                    })
            }
            else if (field.dataType === 'object') {
                // console.log(schema.fields,"object")
                schema = Yup.object().shape(
                    {
                        ...schema.fields,
                        [field.name]: automaticValidationSchema(field.obj)

                    })



            }
            else if (field.dataType === 'Array') {
                // console.log(schema.fields,"Array")
                schema = Yup.object().shape(
                    {
                        ...schema.fields,
                        [field.name]: Yup.array().of(

                            automaticValidationSchema(field.obj)

                        )

                    })





            }
        } else {
            if (field.validation) {
                if (field.validation.regex) {
                    //console.log('non required', field)
                    schema = Yup.object().shape(
                        {
                            ...schema.fields,
                            [field.name]: Yup.string()
                                .matches(new RegExp(field.validation.regex) , `Please provide valid ${field.label} `)

                        })

                }

            }
        }
    })

    function nestedSchema() {


        return null;
    }

    // console.log('schema', schema)
    return schema
}



export default automaticValidationSchema;



