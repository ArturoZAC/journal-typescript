import { TurnedInNot } from "@mui/icons-material"
import { ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material';
import { Note } from "../../store/interfaces/journal.interface";
import { useMemo } from "react";
import { useAppDispatch } from "../../hooks";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({ title, body, id, date, imageUrls = [] }: Note) => {

  const dispatch = useAppDispatch();

  const onClickNote = () => {
    dispatch( setActiveNote({ title, body, id, date, imageUrls}))
  }

  const newTitle = useMemo(() => {
    if(!title) return '';
    return title?.length > 17
      ? title.substring(0,17) + '...'
      : title;
  }, [ title ])

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={ onClickNote }>
          <ListItemIcon>
              <TurnedInNot />
          </ListItemIcon>
          <Grid container>
              <ListItemText primary={ newTitle } />
              <ListItemText secondary={ body } />
          </Grid>
      </ListItemButton>
  </ListItem>
  )
}
