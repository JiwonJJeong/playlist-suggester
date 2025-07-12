import {
    alpha,
    Autocomplete,
    TextField,
    createFilterOptions
} from "@mui/material";

const filter = createFilterOptions();

export default function InputPick({options,selected,setValue, labelText, isRequired=false}){
    const optionsObj = options.map((option)=> ({title: option}))

    return (
        <Autocomplete
        multiple
        value={selected}
        freeSolo
        onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              setValue({
                title: newValue,
              });
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setValue({
                title: newValue.inputValue,
              });
            } else {
              setValue(newValue);
            }
          }}
        handleHomeEndKeys
        selectOnFocus
        filterOptions={(option, params) => {
            const filtered = filter(option, params);
    
            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = option.some((opt) => inputValue === opt.title);
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                title: `Add "${inputValue}"`,
              });
            }
    
            return filtered;
          }}
        options= {optionsObj}
        getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.title;
          }}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                {option.title}
              </li>
            );
          }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={labelText}
            placeholder=""
            required={isRequired}
            sx={{
                input: {
                    color:'white',
                    '::placeholder': {
                        color:'white',
                    }
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#44465a",
                    transition: "border-color 0.2s ease",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6366f1",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#8e54e9",
                      borderWidth: "2px",
                    },
                  },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.7)",
                "&.Mui-focused": {
                    color: "#8e54e9",
                  },
              },

              "& .MuiChip-root": {
                backgroundColor: "#8e54e9",
                color: "white",
                fontSize: "1.00rem"
              },
            }}
          />
        )}
        sx={{ mb: 3 }}
      />
    )
}