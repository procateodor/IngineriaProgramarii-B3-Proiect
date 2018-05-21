package ro.uaic.info.ip.proiect.b3.clientinfo;

import ro.uaic.info.ip.proiect.b3.database.Database;
import ro.uaic.info.ip.proiect.b3.database.objects.cont.Cont;
import ro.uaic.info.ip.proiect.b3.database.objects.materie.Materie;
import ro.uaic.info.ip.proiect.b3.database.objects.tema.Tema;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class InfoExercitiuStudent {
    private String enunt;
    private String extensie;
    private boolean isUploaded;
    private String nota;

    public InfoExercitiuStudent(String enunt, String extensie, boolean isUploaded, String nota) {
        this.enunt = enunt;
        this.extensie = extensie;
        this.isUploaded = isUploaded;
        this.nota = nota;
    }

    public static ArrayList<InfoExercitiuStudent> getInfoExercitiiStudent(
            String loginToken,
            String numeMaterie,
            String numeTema) throws SQLException {
        ArrayList<InfoExercitiuStudent> infoExercitiiStudent = new ArrayList<>();
        Cont cont = Cont.getByLoginToken(loginToken);

        if (cont != null) {
            Connection connection = Database.getInstance().getConnection();

            PreparedStatement preparedStatement = connection.prepareStatement(
                    "SELECT e.enunt, e.extensie_acceptata FROM teme t JOIN tema_exercitiu_extensie e ON t.id = e.id_tema WHERE " +
                            "t.id = ? ORDER BY e.nr_exercitiu");

            Materie materie = Materie.getByTitlu(numeMaterie);
            Tema tema = Tema.getByMaterieIdAndNumeTema(materie.getId(), numeTema);
            preparedStatement.setLong(1, tema.getId());

            ResultSet exercitii = preparedStatement.executeQuery();
            while(exercitii.next()) {
                infoExercitiiStudent.add(new InfoExercitiuStudent(
                        exercitii.getString(1),
                        exercitii.getString(2),
                        false,
                        "-"
                ));
            }

            preparedStatement = connection.prepareStatement(
                    "SELECT nr_exercitiu, nota FROM teme_incarcate WHERE " +
                            "id_cont = ? AND id_tema = ?");
            preparedStatement.setLong(1, cont.getId());
            preparedStatement.setLong(2, tema.getId());

            ResultSet infoStudent = preparedStatement.executeQuery();
            while(infoStudent.next()) {
                infoExercitiiStudent.get(infoStudent.getInt(1) - 1).setUploaded(true);

                if (infoStudent.getInt(2) != 0) {
                    infoExercitiiStudent.get(infoStudent.getInt(1) -1).setNota(
                            Integer.toString(infoStudent.getInt(2)));
                }
            }

            connection.close();
            return infoExercitiiStudent;
        }

        return null;
    }

    public String getEnunt() {
        return enunt;
    }

    public void setEnunt(String enunt) {
        this.enunt = enunt;
    }

    public String getExtensie() {
        return extensie;
    }

    public void setExtensie(String extensie) {
        this.extensie = extensie;
    }

    public boolean isUploaded() {
        return isUploaded;
    }

    public void setUploaded(boolean uploaded) {
        isUploaded = uploaded;
    }

    public String getNota() {
        return nota;
    }

    public void setNota(String nota) {
        this.nota = nota;
    }
}
