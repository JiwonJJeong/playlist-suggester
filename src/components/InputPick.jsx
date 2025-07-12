import {
    alpha,
    Autocomplete,
    TextField,
} from "@mui/material";


export default function InputPick({options,selected,setValue, labelText}){
    

    return (
        <Autocomplete
        multiple
        options= {options}
        value={selected}
        onChange={(_, value) => {
            setValue(value)
        }}
        handleHomeEndKeys
        selectOnFocus

        renderInput={(params) => (
          <TextField
            {...params}
            label={labelText}
            placeholder=""
            sx={{
                input: {
                    color:'white',
                    '::placeholder': {
                        color:'white',
                    }
                },
              "& .MuiOutlinedInput-root": {
                backgroundColor: alpha("#1e1b4b", 0.4),
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "#6366f1",
                },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.7)",
              },
              "& .MuiChip-root": {
                backgroundColor: "#6366f1",
                color: "white",
              },
            }}
          />
        )}
        sx={{ mb: 3 }}
      />
    )
}